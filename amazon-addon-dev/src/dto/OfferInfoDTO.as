package dto {
	import flash.events.Event;
	import flash.events.EventDispatcher;
	
	import mx.events.PropertyChangeEvent;
	
	[Bindable]
	
	public class OfferInfoDTO extends EventDispatcher {
		public var Name:String;
		public var Price:String;
		public var Shipping:String;
		public var MerchantId:String;
		public var BuyURL:String;
		public var MerchantShippingURL:String;
		public var Availability:int;
		public var International:Boolean;
		public var Weight:String="4";
		private var _shippingPriceDTO:ShippingPriceDTO;
		private var _MinShippingPrice:Number;
		private var _NetPrice:Number;
		
		
		public function OfferInfoDTO() {
		}
		
		public function get NetPrice():Number
		{
			return _NetPrice;
		}

		public function set NetPrice(value:Number):void
		{
			_NetPrice = value;
		}

		public function get shippingPriceDTO():ShippingPriceDTO {
			return _shippingPriceDTO;
		}
		
		public function set shippingPriceDTO(value:ShippingPriceDTO):void {
			_shippingPriceDTO=value;
			MinShippingPrice = 1;
			NetPrice = MinShippingPrice + toNumber(Price);
		}
		
		public function set MinShippingPrice(value:Number):void {
			var res:Number=NaN;
			if (shippingPriceDTO) {
				if (shippingPriceDTO.isComplex) {
					res=calculateMinPriceComplex();
				}
				else {
					res=calculateMinPriceSimple();
				}
			}
			_MinShippingPrice=res;
		}
		
		public function get MinShippingPrice():Number {
			return _MinShippingPrice;
		}
		
		private function calculateMinPriceComplex():Number {
			var res:Number=NaN;
			var price:Number=toNumber(Price);
			if (!price) {
				return NaN;
			}
			for each(var b:ShipmentBandsDTO in shippingPriceDTO.perShipmentBandsStandard) {
				if (Number(b.from) <= price) {
					res=Number(b.price);
				}
			}
			for each(b in shippingPriceDTO.perShipmentBandsExpedited) {
				if (Number(b.from) <= price) {
					if (isNaN(res) || res > Number(b.price)) {
						res=Number(b.price);
					}
				}
			}
			return res;
		}
		
		private function calculateMinPriceSimple():Number {
			var res:Number=NaN;
			var weight:Number=toNumber(Weight);
			weight=weight ? weight : 0;
			if (!(shippingPriceDTO.perItemStandard == null && shippingPriceDTO.perShipmentStandard == null && shippingPriceDTO.perWeightStandard == null)) {
				var perItem:Number=Number(shippingPriceDTO.perItemStandard ? shippingPriceDTO.perItemStandard : 0);
				var perShipment:Number=Number(shippingPriceDTO.perShipmentStandard ? shippingPriceDTO.perShipmentStandard : 0);
				var perWeight:Number=Number(shippingPriceDTO.perWeightStandard ? shippingPriceDTO.perWeightStandard : 0);
				
				res=perItem + perShipment + (perWeight * weight);
			}
			
			if (!(shippingPriceDTO.perItemExpedited == null && shippingPriceDTO.perShipmentExpedited == null && shippingPriceDTO.perWeightExpedited == null)) {
				perItem=Number(shippingPriceDTO.perItemExpedited ? shippingPriceDTO.perItemExpedited : 0);
				perShipment=Number(shippingPriceDTO.perShipmentExpedited ? shippingPriceDTO.perShipmentExpedited : 0);
				perWeight=Number(shippingPriceDTO.perWeightExpedited ? shippingPriceDTO.perWeightExpedited : 0);
				
				var r:Number=perItem + perShipment + (perWeight * weight);
				if (!isNaN(res) && res > r) {
					res=r;
				}
			}
			
			return res;
		}
		
		public static function toNumber(sNumber:String):Number {
			if (sNumber == null) {
				return NaN;
			}
			sNumber = sNumber.split(',').join('.');
			var res:Number=NaN;
			while(sNumber) {
				try {
					res=Number(sNumber);
				}
				catch(ex:Error) {
					sNumber=sNumber.substr(1);
					continue;
				}
				if (isNaN(res)) {
					sNumber=sNumber.substr(1);
					continue;
				}
				return res;
			}
			return res;
		}
	}
}





