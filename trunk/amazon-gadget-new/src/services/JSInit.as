package services
{
	import flash.external.ExternalInterface;
	import flash.utils.ByteArray;

	public class JSInit
	{
		[Embed(source="scripts.js", mimeType="application/octet-stream")]
		static private const J_SCRIPT:Class;

		public static function init():void
		{
			var data:ByteArray=new J_SCRIPT();
			data.position=0;
			var code:String=data.readUTFBytes(data.length);
			pushJavaScript(code);
		}

		private static function pushJavaScript(script:String):void
		{
			var str:String='(function(){' + script + ';})';
			ExternalInterface.call(str);
		}
	}
}