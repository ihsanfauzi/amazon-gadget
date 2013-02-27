package utils
{
	import flash.display.Stage;
	import flash.events.Event;
	
	import mx.core.UIComponent;
	
	import spark.components.SkinnableContainer;
	
	import net.hires.debug.Stats;

	public class Utils
	{
//		private static var ui:UIComponent;
		private static var st:Stats;
		public function Utils()
		{
		}
		
		public static function addStats(container:Stage):Stats {
			st = new Stats();
			st.alpha = 0.8;
			st.mouseChildren = false;
			st.mouseEnabled = false;
			container.addChild(st);
			container.addEventListener(Event.ENTER_FRAME, exitFrameHandler);
			return st;
		}
		
		protected static function exitFrameHandler(event:Event):void
		{
			var container:Stage = event.target as Stage;
			var index:Number = container.numChildren;
			container.setChildIndex(st, index-1);
		}
	}
}