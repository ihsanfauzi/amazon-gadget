package utils
{
	
	import com.google.analytics.GATracker;
	
	import flash.display.DisplayObject;
	
	import services.Helper;

	public class GAHelper
	{
		public static var tracker:GATracker;
		public static function trackEvent(action:String, label:String=null, value:Number=NaN):void {
			init();
			var category:String = "Other";
			if (Helper.isChrome()) {
				category = "Chrome";
			}
			if (Helper.isFirefox()) {
				category = "Firefox";
			}
			tracker.trackEvent(category, action, label, value);
		}
		
		public static function trackPageView(page:String):void {
			init();
			tracker.trackPageview(page);
		}
		
		public static function init():void {
			if (!tracker) {
				tracker = new GATracker(null, CHECK_SHIPPING::gaid);
			}
		}
	}
}