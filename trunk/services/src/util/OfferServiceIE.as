package util {
	import services.Helper;
	
	public class OfferServiceIE {
		
		public function OfferServiceIE() {
		}
		
		public static function getItemBySite(site:String, asin:String, content:String):Object {
			var res:Object=new Object();
			res.ASIN=asin;
			res.DetailPageURL="http://" + site + "/dp/" + res.ASIN + "/ref=%3FSubscriptionId%3D%26tag%3D" + Helper.getTagBySite(site) + "%26linkCode%3D%26camp%3D%26creative%3D%26creativeASIN%3D" + res.ASIN;
			res.Offers=new Object();
			return res;
		}
		
		public static function getItem(asin:String, content:String):Object {
			var res:Object=new Object();
			res.ASIN=asin;
			res.DetailPageURL="http://amazon." + Helper.getAWSDomain() + "/dp/" + res.ASIN + "/ref=%3FSubscriptionId%3D%26tag%3D" + Helper.getTag() + "%26linkCode%3D%26camp%3D%26creative%3D%26creativeASIN%3D" + res.ASIN;
			res.Offers=new Object();
			getOffers(res, content);
			if (res.Offers.Offer.length == 0) {
				res=OfferServiceChrome.getItem(asin, content);
			}
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
			var arr:Array=content.split("pagenumberoff ");
			return arr.length;
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
			var sStart:String="<SPAN class=price>";
			var start:Number=info.indexOf(sStart) + sStart.length;
			var subStr:String=info.substring(start);
			var sPrice:String=subStr.substring(0, subStr.indexOf("</SPAN>"));
			if (sPrice.indexOf("<SPAN>") != -1) {
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
			var sStart:String="<UL class=sellerInformation>";
			var sEnd:String="</UL>";
			var start:Number=tbodyResult.indexOf(sStart);
			var subStr:String=tbodyResult.substring(start);
			var end:Number=subStr.indexOf(sEnd) + sEnd.length;
			var sRes:String=subStr.substring(0, end);
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
//			var pattern:RegExp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/;
//			var result:Array = pattern.exec(info);
			var sStart:String=" alt=";
			var start:Number=info.indexOf(sStart) + sStart.length;
			if (start == sStart.length - 1) {
				extractMerhantNameB(res, info);
				return ;
			}
			var subStr:String=info.substring(start);
			var sName:String=subStr.substring(0, subStr.indexOf(" "));
			if (sName.length == 0 || sName == '""') {
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
			var sStart:String="<B>";
			var start:Number=info.indexOf(sStart) + sStart.length;
			if (start == sStart.length - 1) {
				res.Merchant.Name="n/a";
				return ;
			}
			var subStr:String=info.substring(start);
			var sName:String=subStr.substring(0, subStr.indexOf("</B>"));
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
			var ind:int = sID.indexOf("'");
			if (ind>=0) {
				sID = sID.substr(0, ind);
			}
			ind = sID.indexOf("&amp;");
			if (ind>=0) {
				sID = sID.substr(0, ind);
			}
			res.Merchant.MerchantId=sID;
		}
		
		private static function extractTBodyResults(content:String):Array {
			var res:Array=[];
			var sStart:String="<TBODY class=result>";
			var sEnd:String="</TBODY>";
			while(true) {
				var start:Number=content.indexOf(sStart) + sStart.length;
				if (start == sStart.length - 1) {
					break;
				}
				var subStr:String=content.substring(start);
				var end:Number=subStr.indexOf(sEnd);
				var sRes:String=subStr.substring(0, end);
				res.push(sRes);
				content=subStr;
			}
			return res;
		}
	}
}

