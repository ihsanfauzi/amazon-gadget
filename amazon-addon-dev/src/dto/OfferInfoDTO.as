package dto {
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	
	import mx.events.PropertyChangeEvent;
	
	import services.Helper;
	
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
		//public var Weight:String="4";
		private var _shippingPriceDTO:ShippingPriceDTO;
		private var _MinShippingPrice:Number;
		private var _NetPrice:Number;
		
		
		public function OfferInfoDTO() {
		}
		
		public function get NetPrice():Number {
			return _NetPrice;
		}
		
		public function set NetPrice(value:Number):void {
			_NetPrice=value;
		}
		
		public function get shippingPriceDTO():ShippingPriceDTO {
			return _shippingPriceDTO;
		}
		
		public function set shippingPriceDTO(value:ShippingPriceDTO):void {
			_shippingPriceDTO=value;
			MinShippingPrice=1.0;
			var p:Number = toNumber(Price);
			NetPrice=toMoney(MinShippingPrice + p);
		}
		
		private static function toMoney(n:Number):Number {
			return Math.round(n * 100)/100;
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
			var r:Number;
			for each(b in shippingPriceDTO.perShipmentBandsExpedited) {
				if (Number(b.from) <= price) {
					r=Number(b.price);
				}
			}
			if (isNaN(res) || res > r) {
				res=r;
			}
			
			return res;
		}
		
		private function calculateMinPriceSimple():Number {
			var res:Number=NaN;
			if (!(shippingPriceDTO.perItemStandard == null && shippingPriceDTO.perShipmentStandard == null && shippingPriceDTO.perWeightStandard == null)) {
				var perItem:Number=Number(shippingPriceDTO.perItemStandard ? shippingPriceDTO.perItemStandard : 0);
				var perShipment:Number=Number(shippingPriceDTO.perShipmentStandard ? shippingPriceDTO.perShipmentStandard : 0);
				var perWeight:Number=Number(shippingPriceDTO.perWeightStandard ? shippingPriceDTO.perWeightStandard : 0);
				
				res=perItem + perShipment;
				if (perWeight > 0) {
					var weight:Number=getWeight();
					weight=weight ? weight : 0;
					res=res + (perWeight * weight);
				}
			}
			
			if (!(shippingPriceDTO.perItemExpedited == null && shippingPriceDTO.perShipmentExpedited == null && shippingPriceDTO.perWeightExpedited == null)) {
				perItem=Number(shippingPriceDTO.perItemExpedited ? shippingPriceDTO.perItemExpedited : 0);
				perShipment=Number(shippingPriceDTO.perShipmentExpedited ? shippingPriceDTO.perShipmentExpedited : 0);
				perWeight=Number(shippingPriceDTO.perWeightExpedited ? shippingPriceDTO.perWeightExpedited : 0);
				
				var r:Number=perItem + perShipment
				if (perWeight > 0) {
					weight=getWeight();
					weight=weight ? weight : 0;
					r=r + (perWeight * weight);
				}
				if (isNaN(res)) {
					return r;
				}
				if (!isNaN(r) && res > r) {
					res=r;
				}
			}
			
			return res;
		}
		
		public static function toNumber(sNumber:String):Number {
			if (sNumber == null) {
				return NaN;
			}
			sNumber=sNumber.split(" ").join("");
			if (sNumber.toUpperCase().indexOf("EUR") != -1) {
				sNumber=sNumber.split(".").join("");
				sNumber=sNumber.split(",").join(".");
				var start:int = sNumber.lastIndexOf(",");
				if (start != -1 && sNumber.substring(start + 1).length<=2) {
					sNumber = sNumber.split(",").join(".");
				} else {
					sNumber = sNumber.replace(",", "");
				}
			}
			else {
				sNumber=sNumber.split(",").join("");
			}
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
		
		private static function getWeight():Number {
			var content:String=ExternalInterface.call("getDocumentHTML");

			var w:Number = extractKgOrG(content, ["Produktgewicht inkl. Verpackung:"], "EUR");
			if (w) {
				return w;
			}
			
			var sw:String = subContent2(content, "Shipping Weight:", "pounds");
			if (sw) {
				return toNumber(sw);				
			}  
			
			var w:Number = extractKgOrG(content, ["Boxed-product Weight:"]);
			if (w) {
				return w;
			}

			var w:Number = extractKgOrG(content, ["Poids de l'article:", "Poids:", "Dimensions du produit:", "Produktgewicht inkl. Verpackung:"], "EUR");
			if (w) {
				return w;
			}
			return 0;
		}


		public static function extractKgOrG (content:String, names:Array, prefix:String = null):Number {
			for each (var name:String in names) {
				var sw:String = subContent2(content, name, ' Kg');
				if (sw && prefix) {
					sw = prefix + sw;
				}
				var wkg:Number=toNumber(sw);
				if (!wkg) {
					var sw:String=subContent2(content, name, ' g');
					if (sw && prefix) {
						sw = prefix + sw;
					}
					var wg:Number=toNumber(sw);
					if (wg) {
						return wg / 1000;
					}
				} else {
					return wkg;
				}
			}
			return NaN;
		}

		public static function subContent1(content:String, start:String):String {
			if (content == null) {
				return null;
			}
			var index:int=content.indexOf(start);
			if (index == -1) {
				return null;
			}
			return content.substring(index + start.length);
		}
		
		public static function subContent2(content:String, start:String, end:String):String {
			var sub:String=subContent1(content, start);
			if (sub == null) {
				return null;
			}
			var index:int=sub.indexOf(end);
			if (index == -1) {
				return null;
			}
			return sub.substring(0, index);
		}
	}
}