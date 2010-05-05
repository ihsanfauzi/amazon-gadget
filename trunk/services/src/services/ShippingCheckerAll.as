package services
{
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.mxml.HTTPService;

	public class ShippingCheckerAll extends BaseShippingChecker
	{
		protected var site:String;

		public function ShippingCheckerAll(region:String, seller:String, site:String, resultHandler:Function)
		{
			super(region, seller, resultHandler);
			this.site=site;
		}

		override public function check():void
		{
			var serv:HTTPService=new HTTPService();

			serv.url="http://localhost:8080/amazon_check_shipping?seller=" + seller + "&store=" + site + "&region=" + encodeURI(region);
			serv.showBusyCursor=true;
			serv.addEventListener(ResultEvent.RESULT, checkResultHandler);
			serv.addEventListener(FaultEvent.FAULT, checkFaultHandler);
			serv.send();
		}

		private function checkResultHandler(event:ResultEvent):void
		{
			shippingCode=event.result as int;
			resultHandler();
		}

		private function checkFaultHandler(event:FaultEvent):void
		{
			shippingCode=SHIPPING_NA;
			resultHandler();
		}
	}
}