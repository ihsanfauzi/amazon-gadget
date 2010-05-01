package services
{
	import com.adobe.serialization.json.JSON;

	import mx.rpc.AsyncToken;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.mxml.HTTPService;

	public class ShippingCheckerDE extends BaseShippingChecker
	{

		public function ShippingCheckerDE(region:String, seller:String, resultHandler:Function)
		{
			super(region, seller, resultHandler);
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
			if (region == "Weltweit"){
				if (content.indexOf("<b>weltweit</b>.") != -1)
				{
					return SHIPPING_OK;
				}
			}
			if (region == "Japan" || region == "Weltweit")
			{
				if (content.indexOf("<b>"+region+"</b>,") != -1)
				{
					return SHIPPING_OK;
				}
				else
				{
					return SHIPPING_FAIL;
				}
			}
			if (region == "Weltweit" || region == "Übriges Europa")
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
	}
}

