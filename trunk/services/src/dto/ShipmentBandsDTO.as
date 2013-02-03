package dto {
	[RemoteClass(alias="amazon.check.shipping.dto.ShipmentBandsDTO")]
	[Bindable]
	
	public class ShipmentBandsDTO {
		public var from:String;
		public var to:String;
		public var price:String;
		
		public function ShipmentBandsDTO() {
		}
	}
}

