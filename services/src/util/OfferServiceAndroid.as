package util {
	import dto.OfferInfoDTO;
	
	import mx.utils.StringUtil;
	
	import services.Helper;
	
	public class OfferServiceAndroid {
		
		public function OfferServiceAndroid() {
		}
		
		public static function getItem(asin:String, content:String):Object {
			var res:Object=new Object();
			res.ASIN=asin;
			res.DetailPageURL="http://amazon." + Helper.getAWSDomain() + "/dp/" + res.ASIN + "%3FSubscriptionId%3D%26tag%3D" + Helper.getTag(true) + "%26linkCode%3D%26camp%3D%26creative%3D%26creativeASIN%3D" + res.ASIN;
			res.Offers=new Object();
			getOffers(res, content);
			return res;
		}
		
		public static function getItemBySite(site:String, asin:String, content:String):Object {
			var res:Object=new Object();
			res.ASIN=asin;
			res.DetailPageURL="http://" + site + "/dp/" + res.ASIN + "/ref=%3FSubscriptionId%3D%26tag%3D" + Helper.getTagBySite(site, true) + "%26linkCode%3D%26camp%3D%26creative%3D%26creativeASIN%3D" + res.ASIN;
			res.Offers=new Object();
			getOffers(res, content);
			return res;
		}
		
		private static function getOffers(item:Object, content:String):Array {
			var res:Array=[];
			item.Offers.Offer=extractOffers(content);
			item.Offers.TotalOfferPages=extractTotalPages(content);
			return res;
		}
		
		private static function extractTotalPages(content:String):Number {
			content=content.replace("pagenumberon", "pagenumberoff");
			var arr:Array=content.split("\"pagenumberoff\"");
			return arr.length - 1;
		}
		
		private static function extractOffers(content:String):Array {
			var res:Array=[];
			var tbodyResults:Array=extractTBodyResults(content);
			for each(var tbodyResult:String in tbodyResults) {
				res.push(extractOfferDTO(tbodyResult));
			}
			return res;
		}
		
		private static function extractOfferDTO(tbodyResult:String):Object {
			var res:Object=new Object();
			extractSellerInfo(res, tbodyResult);
			extractPrice(res, tbodyResult);
			return res;
		}
		
		private static function extractPrice(res:Object, info:String):void {
			// <span class="price">
			var sStart:String="<span class='a-size-large a-color-price olpOfferPrice a-text-bold'>";
			var sEnd:String="</span>";
			var sPrice:String=subContent2(info, sStart, sEnd);
			if (!sPrice) {
				sPrice="-";
			}
			if (!res.OfferListing) {
				res.OfferListing=new Object();
			}
			if (!res.OfferListing.Price) {
				res.OfferListing.Price=new Object();
			}
			res.OfferListing.Price.FormattedPrice=sPrice;
		}
		
		private static function extractSellerInfo(res:Object, tbodyResult:String):void {
			var sRes:String=tbodyResult;
			extractMerchantID(res, sRes);
			extractMerhantName(res, sRes);
			extractMerhantInternational(res, sRes);
			extractMerhantFulfilledByAmazon(res, sRes);
		}
		
		private static function extractMerhantInternational(res:Object, sRes:String):void {
			res.International=true;
			if (sRes && (sRes.indexOf("Domestic shipping rates") > 0 || sRes.indexOf("Domestic delivery rates") > 0 || sRes.indexOf("cknahmerichtlinien") > 0 || sRes.indexOf("dition nationale") > 0)) {
				res.International=false;
			}
		}
		
		private static function extractMerhantFulfilledByAmazon(res:Object, sRes:String):void {
			res.FulfilledByAmazon=false;
			if (sRes && sRes.indexOf("isAmazonFulfilled=1") > 0) {
				res.FulfilledByAmazon=true;
			}
		}
		
		private static function extractMerhantName(res:Object, info:String):void {
			// <img width="120" height="30" border="0" alt="
			var sStart:String=" alt=\"";
			var start:Number=info.indexOf(sStart) + sStart.length;
			if (start == sStart.length - 1) {
				extractMerhantNameB(res, info);
				return ;
			}
			var subStr:String=info.substring(start);
			var sName:String=subStr.substring(0, subStr.indexOf("\""));
			if (sName.length == 0) {
				extractMerhantNameB(res, info);
				return ;
			}
			if (!res.Merchant) {
				res.Merchant=new Object();
			}
			if (sName) {
				while(sName.indexOf("&amp;") != -1) {
					sName=sName.replace("&amp;", "&");
				}
			}
			res.Merchant.Name=sName;
		}
		
		private static function extractMerhantNameB(res:Object, info:String):void {
			var sStart:String=res.Merchant.MerchantId+"\">";
			var start:Number=info.indexOf(sStart) + sStart.length;
			if (start == sStart.length - 1) {
				res.Merchant.Name="n/a";
				return ;
			}
			var subStr:String=info.substring(start);
			var sName:String=subStr.substring(0, subStr.indexOf("</a>"));
			if (sName) {
				while(sName.indexOf("&amp;") != -1) {
					sName=sName.replace("&amp;", "&");
				}
			}
			res.Merchant.Name=sName;
		}
		
		private static function extractMerchantID(res:Object, info:String):void {
			if (!res.Merchant) {
				res.Merchant=new Object();
			}
			
			var sStart:String="seller=";
			var start:Number=info.indexOf(sStart) + sStart.length;
			if (start == sStart.length - 1) {
				return ;
			}
			var subStr:String=info.substring(start);
			var sID:String=subStr.substring(0, subStr.indexOf("\""));
			res.Merchant.MerchantId=sID;
		}
		
		private static function extractTBodyResults(content:String):Array {
			var res:Array=[];
			var sStart:RegExp=new RegExp("<div class='a-row a-spacing-.* olpOffer'>");
			var sEnd:String="sshmPath=";
			while(true) {
				var subStr:String=StringService.subContent1(content, sStart);
				var sRes:String=StringService.subContent2(subStr, sStart, new RegExp(sEnd));
				if (sRes == null) {
					break;
				}
				res.push(sRes);
				content=subStr.substr(5);
			}
			return res;
		}
		
		public static function constructUrl(asin:String, country:String, page:Number):String {
			var startIndex:Number=(page - 1) * 15;
			var res:String="http://www.amazon." + country + "/gp/offer-listing/" + asin + "/?ie=UTF8&startIndex=" + startIndex + "&condition=new";
			return res;
		}
		
		public static function subContent1(content:String, start:String):String {
			return OfferInfoDTO.subContent1(content, start);
		}
		
		public static function subContent2(content:String, start:String, end:String):String {
			return OfferInfoDTO.subContent2(content, start, end);
		}
	}
}

