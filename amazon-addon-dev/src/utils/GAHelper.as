package utils
{
	
	import com.google.analytics.GATracker;
	
	import flash.display.DisplayObject;

	public class GAHelper
	{
		public static var tracker:GATracker;
		public function GAHelper(d:DisplayObject=null) {
			tracker = new GATracker(d, CHECK_SHIPPING::gaid);
		}
		
		public static function trackEvent(action:String, label:String=null, value:Number=NaN):void {
			tracker.trackEvent("Application", action, label, value);
		}
		
		public static function trackPageView(page:String):void {
			tracker.trackPageview(page);
		}
	}
}