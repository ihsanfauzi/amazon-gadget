package dto {
	import mx.collections.ArrayCollection;
	
	[RemoteClass(alias="amazon.check.shipping.dto.ShippingPriceDTO")]
	[Bindable]
	
	public class ShippingPriceDTO {
		
		public function ShippingPriceDTO() {
		}
		
		public var perShipmentBandsStandard:ArrayCollection;
		public var perShipmentBandsExpedited:ArrayCollection;
		
		public var perItemStandard:Number;
		public var perWeightStandard:Number;
		public var perShipmentStandard:Number;
		public var perItemExpedited:Number;
		public var perWeightExpedited:Number;
		public var perShipmentExpedited:Number;
	}
}

