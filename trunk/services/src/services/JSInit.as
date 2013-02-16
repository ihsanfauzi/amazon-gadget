package services
{
	import flash.external.ExternalInterface;
	import flash.utils.ByteArray;

	public class JSInit
	{
		[Embed(source="scripts.js", mimeType="application/octet-stream")]
		static private const J_SCRIPT:Class;
		static public var J_SCRIPT_STRING:String;
		private static var inited:Boolean = false;

		public static function initJ_SCRIPT() : void
		{
			var file : ByteArray = new J_SCRIPT();
			var str : String = file.readUTFBytes( file.length );
			
			J_SCRIPT_STRING = str.toString()
				.replace( new RegExp( "\\n", "g" ), "" )
				.replace( new RegExp( "\\t", "g" ), "" );
		}
		
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