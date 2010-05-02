package services
{
	import mx.rpc.AsyncToken;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.mxml.HTTPService;

	public class ShippingCheckerDE extends BaseShippingChecker
	{

		public function ShippingCheckerDE(region:String, seller:String, resultHandler:Function)
		{
			super(region, seller, resultHandler);
		}

		override public function check():void
		{
			var serv:HTTPService=new HTTPService();

			serv.url="http://localhost:8080/amazon_check_shipping?seller=" + seller + "&store=www.amazon.de&region=" + encodeURI(region);
			serv.showBusyCursor=true;
			serv.addEventListener(ResultEvent.RESULT, checkResultHandler);
			var token:AsyncToken=serv.send();
		}
		
		private function checkResultHandler(event:ResultEvent):void {
			shippingCode = event.result as int;
			resultHandler();
		}

		override protected function getAmazonSite():String
		{
			return "www.amazon.de";
		}

		override protected function analyzeContent(results:Array):int
		{
			if (region == "Deutschland" || region == "Österreich")
			{
				return SHIPPING_OK;
			}
			var content:String=results[0].content;
			content=content.replace("Japan |", "");
			if (region == "Weltweit")
			{
				if (content.indexOf("<b>weltweit</b>.") != -1)
				{
					return SHIPPING_OK;
				}
			}
			if (region == "Japan" || region == "Weltweit")
			{
				if (content.indexOf("<b>" + region + "</b>,") != -1)
				{
					return SHIPPING_OK;
				}
			}
			if (region == "Weltweit" || region == "Übriges Europa" || region == "Japan")
			{
				if (content.split(region).length > 2)
				{
					return SHIPPING_OK;
				}
				else
				{
					return SHIPPING_FAIL;
				}
			}
			return SHIPPING_OK;
		}

		override protected function analyzeContentPhase2(results:Array):int
		{
			if (results.length > 0)
			{
				var content:String=results[0].content;
				if (content.indexOf("Versandkosten und Lieferzeiten für den Versand bei Amazon Marketplace") != -1)
				{
					return SHIPPING_NA;
				}
				return SHIPPING_FAIL;
			}
			else
			{
				return SHIPPING_NA;
			}
		}
	}
}



