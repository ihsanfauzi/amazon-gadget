package services
{
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

	public class Helper
	{

		public static const CONDITION_NEW = "new";
		public static const CONDITION_USED = "used";
		public static const CONDITION_REFURBISHED = "refurbished";
		
		private static const googleText:String="http://ajax.googleapis.com/ajax/services/language/";
		private static const tsrc:String="translate?v=1.0&q=";
		private static const lanpair:String="&langpair=";
		private static const pairCode:String="%7C";

// The HTTP method used to send the request.
		private static const AWS_METHOD:String="GET";

// The path to the Product API web service on the Amazon host.
		private static const AWS_PATH:String="/onca/xml";

// The AWS Access Key ID to use when querying Amazon.com.
		private static const amazonDeveloperId:String="AKIAIT5IMBSSG3XMONBQ";

// The AWS Secret Key to use when querying Amazon.com.
		private static const amazonSecretAccessKey:String="aLbhK+32hvP6lxTClNoSwdZ1SOL4tjwmnaoicnnO";

		public static function getAWSDomain():String
		{
			var hostname:String=getHostName();
			if (hostname == "localhost") {
				hostname = hostname + ".com";
			}
			var dom:String=hostname.slice(hostname.lastIndexOf(".") + 1);
			if (dom == "uk")
			{
				dom="co.uk";
			}
			return dom;
		}

		public static function getHostName():String
		{
			JSInit.init();
			var hostname:String=ExternalInterface.call("getHostName");
			return hostname;
		}

		public static function createMerchantItemURL(searchItemDTO:SearchItemDTO, offer:OfferDTO):String
		{
			return searchItemDTO.url + encodeURIComponent("/ref=?m=" + offer.merchantID);
		}

		public static function parseAmazonSearchResults(searchDTO:SearchDTO, items:ArrayCollection):SearchDTO
		{
			for each(var item:Object in items)
			{
				var searchItemDTO:SearchItemDTO=findSearchItem(searchDTO.searchItems, item.ASIN);
				searchItemDTO.url=searchItemDTO.url?searchItemDTO.url:item.DetailPageURL;
				searchItemDTO.offers=new ArrayCollection();
				searchItemDTO.setTotalOfferPages(item.Offers.TotalOfferPages);
				var offers:ArrayCollection;
				if (item.Offers.Offer is ArrayCollection)
				{
					offers=item.Offers.Offer;
				}
				else if (item.Offers.Offer is Array)
				{
					offers=new ArrayCollection(item.Offers.Offer as Array);
				}
				else if (item.Offers.Offer)
				{
					offers=new ArrayCollection([item.Offers.Offer]);
				}
				for each (var off:Object in offers)
				{
					var offer:OfferDTO=new OfferDTO();
					offer.international = off.International;
					offer.merchantGlanceURL=off.Merchant.GlancePage;
					offer.merchantID=off.Merchant.MerchantId;
					offer.merchantName=off.Merchant.Name;
					offer.merchantRating=off.Merchant.AverageFeedbackRating;
					offer.merchantShippingURL="http://www.amazon." + getAWSDomain() + "/gp/help/seller/shipping.html?seller=" + offer.merchantID;
					offer.offerListingID=off.OfferListing.OfferListingId;
					offer.price=off.OfferListing.Price.FormattedPrice;
					if (!findOffer(searchItemDTO.offers.source, offer.merchantName))
					{
						searchItemDTO.offers.addItem(offer);
					}
				}
				if (searchItemDTO.offers.length == 0 && item.VariationSummary)
				{
					offer=new OfferDTO();
					offer.isSingleMerchant=true;
					offer.merchantID=item.VariationSummary.SingleMerchantId;
					offer.merchantGlanceURL="http://www.amazon.com/gp/help/seller/home.html?seller=" + offer.merchantID;
					offer.merchantShippingURL=offer.merchantGlanceURL.replace("home.html?", "shipping.html?");
					offer.price=item.VariationSummary.LowestPrice.FormattedPrice;
					searchItemDTO.offers.addItem(offer);
				}
			}
			return searchDTO;
		}

		private static function findSearchItem(searchItems:ArrayCollection, id:String):SearchItemDTO
		{
			for each(var item:SearchItemDTO in searchItems)
			{
				if (item.id == id)
				{
					return item;
				}
			}
			return null;
		}

		public static function findOffer(offers:Array, name:String):OfferDTO
		{
			for each(var off:OfferDTO in offers)
			{
				if (off.merchantName == name)
				{
					return off;
				}
			}
			return null;
		}

		public static function createASINs(sdto:SearchDTO):String
		{
			var res:String="";
			for each(var r:SearchItemDTO in sdto.searchItems)
			{
				res+=r.id + ",";
			}
			res=res.substr(0, res.length - 1);
			return res;
		}

		public static function getTag():String
		{
			var site:String=getHostName();
			return getTagBySite(site);
		}
		
		public static function getTagBySite(site:String):String
		{
			if (site == "localhost") {
				site = "www.amazon.com"; 
			}
			switch(site)
			{
				case "www.amazon.com":
				{
					return "zzzzzzzzzzz-20";
				}
				case "www.amazon.co.uk":
				{
					return "searchengin0d-21";
				}
				case "www.amazon.de":
				{
					return "searamazasto-21";
				}
				case "www.amazon.fr":
				{
					return "searamazast0a-21";
				}
			}
			return null;
		}
		
		public static function generateSignature(request:Object):void
		{
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
			request.AssociateTag=getTag();

			// Set the request timestamp using the format: YYYY-MM-DDThh:mm:ss.000Z
			// Note that we must convert to GMT.
			formatter.formatString="YYYY-MM-DDTHH:NN:SS.000Z";
			now.setTime(now.getTime() + (now.getTimezoneOffset() * 60 * 1000));
			request.Timestamp=formatter.format(now);

			// Process the parameters.
			for(var key:String in request)
			{
				// Ignore the "Signature" request parameter.
				if (key != "Signature")
				{
					request[key]=StringUtil.trim(String(request[key]));
					var urlEncodedKey:String=encodeURIComponent(decodeURIComponent(key));
					var parameterBytes:ByteArray=new ByteArray();
					var valueBytes:ByteArray=new ByteArray();
					var value:String=request[key];
					var urlEncodedValue:String=encodeURIComponent(decodeURIComponent(value.replace(/\+/g, "%20")));
					// Use the byte values, not the string values.
					parameterBytes.writeUTFBytes(urlEncodedKey);
					valueBytes.writeUTFBytes(urlEncodedValue);
					parameterCollection.addItem({parameter:parameterBytes, value:valueBytes});
				}
			}

			// Sort the parameters and formulate the parameter string to be signed.
			parameterCollection.sort=sort;
			sort.fields=[new SortField("parameter", false), new SortField("value", false)];
			parameterCollection.refresh();
			parameterString=AWS_METHOD + "\necs.amazonaws." + getAWSDomain() + "\n" + AWS_PATH + "\n";
			for(var i:Number=0; i < parameterCollection.length; i++)
			{
				var pair:Object=parameterCollection.getItemAt(i);


				parameterString+=pair.parameter + "=" + pair.value;

				if (i < parameterCollection.length - 1)
					parameterString+="&";
			}

			// Sign the parameter string to generate the request signature.
			requestBytes.writeUTFBytes(parameterString);
			keyBytes.writeUTFBytes(amazonSecretAccessKey);
			hmacBytes=hmac.compute(keyBytes, requestBytes);
			
			//TODO Uncomment this !!!!!!!!!
			//encoder.encodeBytes(hmacBytes);
			request.Signature=encoder.toString();
		}

		public static function addTag(s:String):String
		{
			if (s.indexOf("?") != -1)
			{
				s=s + "&tag=7search-20";
			}
			else
			{
				s=s + "?tag=7search-20";
			}
			return s;
		}

		public static function createAmazonNewReleasesURL():String
		{
			var res:String="http://ws.amazon.com/widgets/q?display%5FURL=SCRIPT%5FNOT%5FSUPPORTED&rankType=new%2Dreleases&numToRequest=10&Operation=GetResults&startAt=1&TemplateId=8010&ServiceVersion=20070822&MarketPlace=US&SearchIndex=" + getRandomSearhIndex();
			return res;
		}

		private static const searchIndexes:Array=["All", "Apparel", "Automotive", "Baby", "Beauty", "Books", "Classical", "DigitalMusic", "DVD", "Electronics", "GourmetFood", "Grocery", "HealthPersonalCare", "HomeImprovement", "Industrial", "Jewelry", "KindleStore", "Kitchen", "Magazines", "Merchants", "Miscellaneous", "MP3Downloads", "Music", "MusicalInstruments", "MusicTracks", "OfficeProducts", "OutdoorLiving", "PCHardware", "PetSupplies", "Photo", "Shoes", "SilverMerchants", "Software", "SportingGoods", "Tools", "Toys", "UnboxVideo", "VHS", "Video", "VideoGames", "Watches", "Wireless", "WirelessAccessories"];

		public static function getRandomSearhIndex():String
		{
			var index:Number=randRange(0, searchIndexes.length - 1);
			trace(searchIndexes[index]);
			return searchIndexes[index];
		}

		public static function randRange(min:Number, max:Number):Number
		{
			var randomNum:Number=Math.floor(Math.random() * (max - min + 1)) + min;
			return randomNum;
		}

		public static function parseTranslateResults(event:ResultEvent):String
		{
			var rawData:String=String(event.result);
			if (com.adobe.serialization.json.JSON.decode(rawData).responseData.translatedText != null)
			{
				var decoded:String=com.adobe.serialization.json.JSON.decode(rawData).responseData.translatedText;
			}
			else
			{
				decoded="None support";
			}
			return decoded;
		}

		public static function getRegionKeyword(region:String):String
		{
			switch(region)
			{
				case "Continental US":
				{
					return "";
				}
				case "Alaska and Hawaii":
				{
					return "Alaska and Hawaii Street";
				}
				case "US Protectorates":
				{
					return "US Protectorates Street";
				}
				case "APO/FPO":
				{
					return "APO/FPO Street";
				}
				case "Outside US, Eur., CA, Asia":
				{
					return "Outside US";
				}
			}
			return region;
		}

		public static function checkCountry(region:String, description:String):Boolean
		{
			switch(region)
			{
				case "Continental US":
				{
					return true;
				}
				case "Alaska and Hawaii":
				{
					return true;
				}
				case "US Protectorates":
				{
					return true;
				}
				case "APO/FPO":
				{
					return true;
				}
				case "Canada":
				{
					var temp:String=description.replace("<b>Canada</b>, <b>Canada</b>", "");
					return temp.indexOf("Canada") != -1;
				}
				case "Europe":
				{
					temp=description.replace("<b>Europe</b>, Albania", "");
					return temp.indexOf("Europe") != -1;
				}
				case "Asia":
				{
					temp=description.replace("<b>Asia</b>, Australia", "");
					temp=temp.replace("<b>Asia</b>, Brazil", "");
					return temp.indexOf("Asia") != -1;
				}
				case "Outside US, Eur., CA, Asia":
				{
					temp=description.replace("<b>Outside US</b>, Eur., CA, Asia, Brazil", "");
					return temp.indexOf("Outside US") != -1;
				}
			}
			return false;
		}

		public static function createGoogleSearchAmazonURL(page:int, keyword:String, category:String):String
		{
			return createGoogleSearchURL(page, "inurl:dp site:www.amazon.com " + keyword + " " + category);
		}

		public static function createGoogleSearchURL(page:int, keyword:String):String
		{
			page=page * 8 - 8;
			return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=large&start=' + page + '&q=' + encodeURIComponent(keyword);
		}

		public static function createTranslateURL(text:String, fromLang:String, toLang:String):String
		{
			return googleText + tsrc + encodeURI(text) + lanpair + fromLang + pairCode + toLang;
		}

		public static function openAmazonItem(url:String):void
		{
			var urlRequest:URLRequest=new URLRequest(url);
			flash.net.navigateToURL(urlRequest, '_blank');
		}

		public static function getRegionByCountry(country:String):String
		{
			//TODO implement
			return country;
		}

		public static function createSearchAmazonURL(keyword:String, category:String, page:int):String
		{
			var res:String="http://ws.amazon.com/widgets/q?Operation=GetResults&Keywords=" + encodeURIComponent(keyword) + "&SearchIndex=" + (category ? category : "All") + "&multipageStart=" + (page - 1) * 10 + "&InstanceId=0&multipageCount=10&TemplateId=8002&ServiceVersion=20070822&MarketPlace=US";
			return res;
		}

		public static function evalScripts():void
		{
		//ExternalInterface.call("eval", scripts);
		}
		
		public static function constructPageUrl(asin:String, country:String, page:Number, condition:String):String {
			var startIndex:Number=(page - 1) * 15;
			var res:String="http://www.amazon." + country + "/gp/offer-listing/" + asin + "/?ie=UTF8&startIndex=" + startIndex + "&condition=" + condition;
			return res;
		}
		
		public static function constructProductUrl(asin:String, country:String):String {
			var res:String="http://www.amazon." + country + "/gp/product/" + asin;
			return res;
		}
	}
}

