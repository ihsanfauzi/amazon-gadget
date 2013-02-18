package utils
{
	import mx.core.UIComponent;
	
	import spark.components.SkinnableContainer;
	
	import net.hires.debug.Stats;

	public class Utils
	{
		public function Utils()
		{
		}
		
		public static function addStats(container:SkinnableContainer):Stats {
			var st:Stats = new Stats();
			var ui:UIComponent = new UIComponent();
			ui.addChild(st);
			container.addElement(ui);
			return st;
		}
	}
}