package
{
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;
	
	public class Log extends Sprite
	{
		[Embed(source="scripts.js", mimeType="application/octet-stream")]
		static private const J_SCRIPT:Class;
		public function Log()
		{
			super();
			initScript();
			logPage();
		}
		
		private function logPage():void
		{
			var ref:String = ExternalInterface.call("document.referrer.toString");
			var page:String = ExternalInterface.call("location.href.toString");
			var req:URLRequest = new URLRequest("http://log.aliamaz.com/?ref=" + encodeURIComponent(ref) +
				"&page=" + encodeURIComponent(page));
			var l:URLLoader = new URLLoader();
			try {
				l.load(req);
			} catch (err:Error) {}
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
	}
}