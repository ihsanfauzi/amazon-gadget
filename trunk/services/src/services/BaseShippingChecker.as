package services {
	import com.adobe.serialization.json.JSON;
	
	import mx.rpc.AsyncToken;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.mxml.HTTPService;
	
	public class BaseShippingChecker {
		public static const SHIPPING_OK:int = 1;
		public static const SHIPPING_FAIL:int = 2;
		public static const SHIPPING_NA:int = 0;
		public static const SHIPPING_LOADING:int = 3;
		
		protected var region:String;
		protected var seller:String;
		protected var resultHandler:Function;
		public var shippingCode:int;
		
		public function BaseShippingChecker(region:String, seller:String, resultHandler:Function) {
			this.region = region;
			this.seller = seller;
			this.resultHandler = resultHandler
		}
		
		public function check():void {
			var serv:HTTPService = new HTTPService();
			var query:String = 'site:' + getAmazonSite() + '/gp/help/seller/shipping.html inurl:"seller=' + seller + '" "' + region + '"';
			serv.url = Helper.createGoogleSearchURL(1, query);
			serv.showBusyCursor = true;
			serv.addEventListener(ResultEvent.RESULT, checkResultHandler);
			var token:AsyncToken = serv.send();
			token.query = query;
		}
		
		protected function getAmazonSite():String {
			return "www.amazon.com";
		}
		
		protected function analyzeContent(results:Array):int {
			return SHIPPING_OK;
		}
		
		private function checkResultHandler(event:ResultEvent):void {
			var query:String = event.token.query;
			trace(query);
			var dec:Object = com.adobe.serialization.json.JSON.decode(event.result as String);
			var results:Array = dec.responseData.results as Array;
			if (results.length == 0) {
				checkPhase2();
			} else {
				this.shippingCode = analyzeContent(results);
				resultHandler();
			}
		}
		
		private function checkPhase2():void {
			var serv:HTTPService = new HTTPService();
			var query:String = 'site:' + getAmazonSite() + '/gp/help/seller/shipping.html inurl:"seller=' + seller + '"';
			serv.url = Helper.createGoogleSearchURL(1, query);
			serv.showBusyCursor = true;
			serv.addEventListener(ResultEvent.RESULT, checkPhase2ResultHandler);
			var token:AsyncToken = serv.send();
			token.query = query;
		}
		
		private function checkPhase2ResultHandler(event:ResultEvent):void {
			var query:String = event.token.query;
			trace(query);
			var dec:Object = com.adobe.serialization.json.JSON.decode(event.result as String);
			var results:Array = dec.responseData.results as Array;
			this.shippingCode = analyzeContentPhase2(results);
			resultHandler();
		}
		
		protected function analyzeContentPhase2(results:Array):int {
			if (results.length > 0) {
				return SHIPPING_FAIL;
			} else {
				return SHIPPING_NA;
			}
		}
	}
}



