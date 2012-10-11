package util {
	import flash.external.ExternalInterface;
	
	import services.Helper;
	
	public class UrlsService {
		
		public function UrlsService() {
		}
		
		public static function createAddToCartUrl(offerListingId:String):String {
			var sessionId:String=ExternalInterface.call("Get_Cookie", "sessionId");
			var subscriptionId:String="";
			var associateTag:String=Helper.getTag();
			var asin:String=ExternalInterface.call("getCurrentASIN");
			var url:String="https://www.amazon.com/gp/aws/cart/add.html/ref=?SessionId=" + sessionId + "&SubscriptionId=" + subscriptionId + "AssociateTag=" + associateTag + "&ASIN.1=" + asin + "&Quantity.1=1&adid=&linkCode=as1&OfferListingId.1=" + offerListingId + "&submit.add.x=14&submit.add.y=14";
			return url;
			
			//%252B7xr3iHJ1bM8hO0YnopbajhFdDfwCu%252BK0nh6AyKxPWclg2LkjtAA6Rpjp9FKn0BYoDQWW0Ms6%252FBgK92KGaxbpvIJoJuDyguPKN7tN%252B%252Bf4mTBGVhvkFoM3TgR%252FpR%252FNu9A8Wic6ffnpC2Ixj%252BkgvQZ3oaXKyD4d%252FOK
		}
	}
}

