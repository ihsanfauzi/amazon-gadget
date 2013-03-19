package datas {
	[Bindable]
	
	public class UrlData {
		private var _loadingInt:Number;
		public var loading:Boolean;
		public var domain:String;
		public var asin:String;
		public var label:String;
		public var url:String;// = "http://amazon.com";
		
		public function UrlData() {
		}
		
		public function get loadingInt():Number {
			return _loadingInt;
		}
		
		public function set loadingInt(value:Number):void {
			_loadingInt = value;
			if (_loadingInt > 0) {
				loading = true;
			} else {
				loading = false;
			}
		}
		
	}
}



