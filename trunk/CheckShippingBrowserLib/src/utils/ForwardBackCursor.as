package utils
{
	[Bindable]
	public class ForwardBackCursor
	{
		public var canGoForward:Boolean;
		public var canGoBack:Boolean;
		public var pointer:Number = 0;
		public var allcounter:Number = 0;
		public var locked:Boolean;
		public function ForwardBackCursor()
		{
		}
		
		public function forward():void {
			pointer++;
			canGoBack=true;
			canGoForward=allcounter>pointer;
			locked = true;
		}
		
		public function back():void {
			pointer--
			canGoBack=pointer>0;
			canGoForward=true;
			locked = true;
		}
		
		public function navigate():void {
			forward();
			allcounter = pointer;
			canGoBack=pointer>0;
			canGoForward=false;
		}
	}
}