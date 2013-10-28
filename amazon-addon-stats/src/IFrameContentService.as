package {
	import flash.display.Sprite;
	import flash.events.EventDispatcher;
	import flash.events.TimerEvent;
	import flash.external.ExternalInterface;
	import flash.utils.Timer;
	
	public class IFrameContentService {
		
		public static function getContent(url:String, callback:Function = null):void {
			var iframeName:String=createUID().split("-").join("_");
			ExternalInterface.call("createIFrame", iframeName, url, "get" + iframeName + "Content = function(){return document.getElementById('" + iframeName + "').contentWindow.document.getElementsByTagName('html')[0].innerHTML}");
			if (callback != null) {
				var timer:Timer = new Timer(100);
				timer.addEventListener(TimerEvent.TIMER, function(...o):void {
					var res:Object=ExternalInterface.call("get" + iframeName + "Content");
					if (res) {
						timer.stop();
						callback(res);
					}
				});
				timer.start();
			}
		}
		
		public static function getContentUID(url:String, callback:Function = null):void {
			var iframeName:String=createUID().split("-").join("_");
			ExternalInterface.call("createIFrame", iframeName, url, "get" + iframeName + "Content = function(){return document.getElementById('" + iframeName + "').contentWindow.document.getElementsByTagName('html')[0].innerHTML}");
			if (callback != null) {
				var timer:Timer = new Timer(100);
				timer.addEventListener(TimerEvent.TIMER, function(...o):void {
					var res:Object=ExternalInterface.call("get" + iframeName + "Content");
					if (res) {
						timer.stop();
						callback(iframeName, res);
					}
				});
				timer.start();
			}
		}
		
		public static function pingUrl(url:String):void {
			var imgName:String=createUID().split("-").join("_");
			ExternalInterface.call("createImage", imgName, url);
		}
		
		private static function createUID():String {
			return "u"+Math.random();
		}
	}
}



