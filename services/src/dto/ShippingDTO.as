package dto {
	[RemoteClass(alias="amazon.check.shipping.dto.ShippingDTO")]
	[Bindable]
	
	public class ShippingDTO {
		public var availability:int;
		public var shippingPrice:ShippingPriceDTO;
		
		public function ShippingDTO() {
		}
	}
}

