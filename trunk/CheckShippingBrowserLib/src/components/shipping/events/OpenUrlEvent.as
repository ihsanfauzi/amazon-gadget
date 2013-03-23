package components.shipping.events
{
	import flash.events.Event;
	
	public class OpenUrlEvent extends Event {
		public static const TYPE:String = "openUrl";
		public var url:String;
		public function OpenUrlEvent(url:String) {
			super(TYPE, true, true);
			this.url = url;
		}
	}
}