package util
{
	public class StringService
	{
		public function StringService()
		{
		}
		
		public static function subContent1(content:String, start:RegExp):String {
			if (content == null) {
				return null;
			}
			var index:int=content.search(start);
			if (index == -1) {
				return null;
			}
			return content.substring(index);
		}
		
		public static function subContent2(content:String, start:RegExp, end:RegExp):String {
			var sub:String=subContent1(content, start);
			if (sub == null) {
				return null;
			}
			var index:int=sub.search(end);
			if (index == -1) {
				return null;
			}
			return sub.substring(0, index);
		}
	}
}