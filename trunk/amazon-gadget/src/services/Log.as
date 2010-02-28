package services
{
	import flash.external.ExternalInterface;

	public class Log
	{

		public function Log()
		{
		}

		public static function initialized():void
		{
			log("initialized");
		}

		public static function searchClicked():void
		{
			log("searchClicked");
		}

		public static function checkShippingClicked():void
		{
			log("checkShippingClicked");
		}

		public static function buyLinkClicked():void
		{
			log("buyLinkClicked");
		}

		public static function iGoofleClicked():void
		{
			log("iGoofleClicked");
		}

		public static function bookmarkClicked():void
		{
			log("bookmarkClicked");
		}

		private static function log(action:String):void
		{
			ExternalInterface.call(action + "()");
		}
	}
}

