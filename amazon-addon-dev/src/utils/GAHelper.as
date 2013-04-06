package utils
{
	
	import com.google.analytics.GATracker;
	
	import flash.display.DisplayObject;

	public class GAHelper
	{
		public static var tracker:GATracker;
		public static function trackEvent(action:String, label:String=null, value:Number=NaN):void {
			init();
			tracker.trackEvent("Application", action, label, value);
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