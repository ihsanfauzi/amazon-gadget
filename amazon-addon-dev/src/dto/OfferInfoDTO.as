package dto {
	[Bindable]
	
	public class OfferInfoDTO {
		public var Name:String;
		public var Price:String;
		public var MinShippingPrice:String;
		public var NetPrice:String;
		public var Shipping:String;
		public var MerchantId:String;
		public var BuyURL:String;
		public var MerchantShippingURL:String;
		public var Availability:int;
		public var International:Boolean;
		
		
		public function OfferInfoDTO() {
		}
	}
}

