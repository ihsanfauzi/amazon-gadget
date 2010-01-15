package services {
	import com.adobe.serialization.json.JSON;
	import com.hurlant.crypto.hash.HMAC;
	import com.hurlant.crypto.hash.SHA256;
	
	import dto.OfferDTO;
	import dto.SearchDTO;
	import dto.SearchItemDTO;
	
	import flash.external.ExternalInterface;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;
	
	import mx.collections.ArrayCollection;
	import mx.collections.Sort;
	import mx.collections.SortField;
	import mx.formatters.DateFormatter;
	import mx.rpc.events.ResultEvent;
	import mx.utils.Base64Encoder;
	import mx.utils.StringUtil;

	public class Helper {

		private static const googleText:String="http://ajax.googleapis.com/ajax/services/language/";
		private static const tsrc:String="translate?v=1.0&q=";
		private static const lanpair:String="&langpair=";
		private static const pairCode:String="%7C";



// The Amazon host providing the Product API web service.
		private static const AWS_HOST:String="ecs.amazonaws.com";

// The HTTP method used to send the request.
		private static const AWS_METHOD:String="GET";

// The path to the Product API web service on the Amazon host.
		private static const AWS_PATH:String="/onca/xml";

// The AWS Access Key ID to use when querying Amazon.com.
		private static const amazonDeveloperId:String="AKIAIT5IMBSSG3XMONBQ";

// The AWS Secret Key to use when querying Amazon.com.
		private static const amazonSecretAccessKey:String="aLbhK+32hvP6lxTClNoSwdZ1SOL4tjwmnaoicnnO";

		public static function generateSignature(request:Object):void {
			var parameterArray:Array=new Array();
			var parameterCollection:ArrayCollection=new ArrayCollection();
			var parameterString:String="";
			var sort:Sort=new Sort();
			var hmac:HMAC=new HMAC(new SHA256());
			var requestBytes:ByteArray=new ByteArray();
			var keyBytes:ByteArray=new ByteArray();
			var hmacBytes:ByteArray;
			var encoder:Base64Encoder=new Base64Encoder();
			var formatter:DateFormatter=new DateFormatter();
			var now:Date=new Date();

			request.AWSAccessKeyId=amazonDeveloperId;
			// Set the request timestamp using the format: YYYY-MM-DDThh:mm:ss.000Z
			// Note that we must convert to GMT.
			formatter.formatString="YYYY-MM-DDTHH:NN:SS.000Z";
			now.setTime(now.getTime() + (now.getTimezoneOffset() * 60 * 1000));
			request.Timestamp=formatter.format(now);

			// Process the parameters.
			for(var key:String in request) {
				// Ignore the "Signature" request parameter.
				if (key != "Signature") {
					request[key]=StringUtil.trim(String(request[key]));
					var urlEncodedKey:String=encodeURIComponent(decodeURIComponent(key));
					var parameterBytes:ByteArray=new ByteArray();
					var valueBytes:ByteArray=new ByteArray();
					var value:String=request[key];
					var urlEncodedValue:String=encodeURIComponent(decodeURIComponent(value.replace(/\+/g,
						"%20")));
					// Use the byte values, not the string values.
					parameterBytes.writeUTFBytes(urlEncodedKey);
					valueBytes.writeUTFBytes(urlEncodedValue);
					parameterCollection.addItem({parameter:parameterBytes, value:valueBytes});
				}
			}

			// Sort the parameters and formulate the parameter string to be signed.
			parameterCollection.sort=sort;
			sort.fields=[new SortField("parameter", true), new SortField("value", true)];
			parameterCollection.refresh();
			parameterString=AWS_METHOD + "\n" + AWS_HOST + "\n" + AWS_PATH + "\n";
			for(var i:Number=0; i < parameterCollection.length; i++) {
				var pair:Object=parameterCollection.getItemAt(i);


				parameterString+=pair.parameter + "=" + pair.value;

				if (i < parameterCollection.length - 1)
					parameterString+="&";
			}

			// Sign the parameter string to generate the request signature.
			requestBytes.writeUTFBytes(parameterString);
			keyBytes.writeUTFBytes(amazonSecretAccessKey);
			hmacBytes=hmac.compute(keyBytes, requestBytes);
			encoder.encodeBytes(hmacBytes);
			request.Signature=encoder.toString();
		}

		public static function parseGoogleResults(event:ResultEvent):SearchDTO {
			var resDTO:SearchDTO=new SearchDTO();
			var rawData:String=String(event.result);
			var responseData:Object=JSON.decode(rawData).responseData;
			var pages:Array=responseData.cursor.pages;
			if (pages) {
				var pagesCount:int=pages.length;
			}
			var results:Array=responseData.results;
			for each(var r:Object in results) {
				var unescapedUrl:String=r.unescapedUrl;
				var title:String=r.title;
				var content:String=r.content;
				var item:SearchItemDTO=new SearchItemDTO();
				item.originalUrl=unescapedUrl;
				var id:String=unescapedUrl.substring(unescapedUrl.indexOf("dp/") + 3);
				id=id.replace("product-description/", "");
				item.id=id;
				item.description=content;
				item.name=title;
				item.url=addTag(unescapedUrl);
				resDTO.searchItems.addItem(item);
			}
			return resDTO;
		}

		public static function addTag(s:String):String {
			if (s.indexOf("?") != -1) {
				s=s + "&tag=catalog0e-20";
			} else {
				s=s + "?tag=catalog0e-20";
			}
			return s;
		}

		public static function createAmazonURL(sdto:SearchDTO):String {
			var res:String="http://ws.amazon.com/widgets/q?Operation=GetResults&InstanceId=0&TemplateId=8001&" +
				"ServiceVersion=20070822&MarketPlace=US&ItemId=";
			res+=createASINs(sdto);
			return res;
		}

		public static function createASINs(sdto:SearchDTO):String {
			var res:String="";
			for each(var r:SearchItemDTO in sdto.searchItems) {
				res+=r.id + ",";
			}
			res=res.substr(0, res.length - 1);
			return res;
		}

		public static function parseAmazonResults(resDTO:SearchDTO, rawData:String):SearchDTO {
			ExternalInterface.call(rawData);
			var data:Object=ExternalInterface.call("getRawData");
			if (data && data.results) {
				for each(var r:Object in data.results) {
					var si:SearchItemDTO=findSearchItem(resDTO.searchItems, r.ASIN);
					si.price=r.Price;
					si.rating=r.Rating;
					si.imgSrc=r.ThumbImageUrl;
					if (r.DetailPageURL) {
						si.url=r.DetailPageURL + "?ie=UTF8&tag=catalog0e-20";
					}
					si.description+=" <br>" + r.Title + "<br><b>" + r.category + "</b>";
				}
			}

			return resDTO;
		}

		public static function parseTranslateResults(event:ResultEvent):String {
			var rawData:String=String(event.result);
			if (JSON.decode(rawData).responseData.translatedText != null) {
				var decoded:String=JSON.decode(rawData).responseData.translatedText;
			} else {
				decoded="None support";
			}
			return decoded;
		}

		public static function parseAmazonSearchResults(searchDTO:SearchDTO, items:ArrayCollection):SearchDTO {
			for each(var item:Object in items) {
				var searchItemDTO:SearchItemDTO=findSearchItem(searchDTO.searchItems, item.ASIN);
				searchItemDTO.offers=[];
				var offers:ArrayCollection;
				if (item.Offers.Offer is ArrayCollection) {
					offers=item.Offers.Offer;
				} else if (item.Offers.Offer) {
					offers=new ArrayCollection([item.Offers.Offer]);
				}
				for each(var off:Object in offers) {
					var offer:OfferDTO=new OfferDTO();
					offer.merchantGlanceURL=off.Merchant.GlancePage;
					offer.merchantID=off.Merchant.MerchantId;
					offer.merchantName=off.Merchant.Name;
					offer.merchantRating=off.Merchant.AverageFeedbackRating;
					offer.merchantShippingURL="http://www.amazon.com/gp/help/seller/shipping.html?seller=" +
						offer.merchantID;
					offer.offerListingID=off.OfferListing.OfferListingId;
					offer.price=off.OfferListing.Price.FormattedPrice;
					searchItemDTO.offers.push(offer);
				}
				if (searchItemDTO.offers.length == 0 && item.VariationSummary) {
					offer=new OfferDTO();
					offer.isSingleMerchant=true;
					offer.merchantID=item.VariationSummary.SingleMerchantId;
					offer.merchantGlanceURL="http://www.amazon.com/gp/help/seller/home.html?seller=" +
						offer.merchantID;
					offer.merchantShippingURL=offer.merchantGlanceURL.replace("home.html?", "shipping.html?");
					offer.price=item.VariationSummary.LowestPrice.FormattedPrice;
					searchItemDTO.offers.push(offer);
				}
			}
			return searchDTO;
		}

		public static function createGoogleSearchAmazonMerchantURL(region:String, offer:OfferDTO):String {
			if (!offer.isSingleMerchant) {
				var keyword:String='';
				keyword+=offer.merchantName ? 'intitle:"Shipping Rates:' + offer.merchantName + '"' :
					'"';
				keyword+=' site:amazon.com inurl:"shipping.html"';
			} else {
				keyword='';
				keyword+=' site:amazon.com inurl:"shipping.html" inurl:' + offer.merchantID;
			}
			keyword='"' + getRegionKeyword(region) + '" ' + keyword;
			trace(keyword);
			var url:String=createGoogleSearchURL("1", keyword);
			return url;
		}

		public static function getRegionKeyword(region:String):String {
			switch(region) {
				case "Continental US": {
					return "";
				}
				case "Alaska and Hawaii": {
					return "Alaska and Hawaii Street";
				}
				case "US Protectorates": {
					return "US Protectorates Street";
				}
				case "APO/FPO": {
					return "APO/FPO Street";
				}
				case "Outside US, Eur., CA, Asia": {
					return "Outside US";
				}
			}
			return region;
		}
		
		public static function checkCountry(region:String, description:String):Boolean {
			switch(region) {
				case "Continental US": {
					return true;
				}
				case "Alaska and Hawaii": {
					return true;
				}
				case "US Protectorates": {
					return true;
				}
				case "APO/FPO": {
					return true;
				}
				case "Canada": {
					var temp:String=description.replace("<b>Canada</b>, <b>Canada</b>", "");
					return temp.indexOf("Canada") != -1;
				}
				case "Europe": {
					temp=description.replace("<b>Europe</b>, Albania", "");
					return temp.indexOf("Europe") != -1;
				}
				case "Asia": {
					temp=description.replace("<b>Asia</b>, Australia", "");
					return temp.indexOf("Asia") != -1;
				}
				case "Outside US, Eur., CA, Asia": {
					temp=description.replace("<b>Outside US</b>, Eur., CA, Asia, Brazil", "");
					return temp.indexOf("Outside US") != -1;
				}
			}
			return false;
		}

		public static function createGoogleSearchAmazonURL(page:String, keyword:String, category:String):String {
			return createGoogleSearchURL(page, "inurl:dp site:www.amazon.com " + keyword + " " + category);
		}

		public static function createGoogleSearchURL(page:String, keyword:String):String {
			return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=large&start=' + page +
				'&q=' + encodeURIComponent(keyword);
		}

		public static function createMerchantItemURL(asin:String, offer:OfferDTO):String {
			return "http://www.amazon.com/dp/" + asin + "/?m=" + offer.merchantID;
		}

		public static function createTranslateURL(text:String, fromLang:String, toLang:String):String {
			return googleText + tsrc + encodeURI(text) + lanpair + fromLang + pairCode + toLang;
		}

		private static function findSearchItem(searchItems:ArrayCollection, id:String):SearchItemDTO {
			for each(var item:SearchItemDTO in searchItems) {
				if (item.id == id) {
					return item;
				}
			}
			return null;
		}

		public static function openAmazonItem(url:String):void {
			var urlRequest:URLRequest=new URLRequest(url);
			flash.net.navigateToURL(urlRequest, '_blank');
		}

		public static function getRegionByCountry(country:String):String {
			//TODO implement
			return country;
		}
	}
}

