package services
{
	import flash.external.ExternalInterface;
	import flash.utils.ByteArray;

	public class JSInit
	{
		[Embed(source="scripts.js", mimeType="application/octet-stream")]
		static private const J_SCRIPT:Class;
		private static var inited:Boolean = false;

		public static function init():void
		{
			if (!inited){
				var data:ByteArray=new J_SCRIPT();
				data.position=0;
				var code:String=data.readUTFBytes(data.length);
				pushJavaScript(code);
				inited = true;
			}
		}

		private static function pushJavaScript(script:String):void
		{
			var str:String='(function(){' + script + ';})';
			ExternalInterface.call(str);
		}
	}
}