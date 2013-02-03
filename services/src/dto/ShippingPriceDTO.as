package dto {
	import mx.collections.ArrayCollection;
	
	[RemoteClass(alias="amazon.check.shipping.dto.ShippingPriceDTO")]
	[Bindable]
	
	public class ShippingPriceDTO {
		
		public function ShippingPriceDTO() {
		}
		public var isComplex:Boolean;
		
		public var perShipmentBandsStandard:ArrayCollection;
		public var perShipmentBandsExpedited:ArrayCollection;
		
		public var perItemStandard:String;
		public var perWeightStandard:String;
		public var perShipmentStandard:String;
		public var perItemExpedited:String;
		public var perWeightExpedited:String;
		public var perShipmentExpedited:String;
	}
}

