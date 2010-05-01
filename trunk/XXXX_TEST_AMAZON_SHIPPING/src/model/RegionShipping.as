package model
{
	[Bindable]
	public class RegionShipping
	{
		public function RegionShipping()
		{
		}
		public var seller:Seller;
		public var region:String;
		public var actualShipping:int;
		public var detectedShipping:int;
		public var amazonSite:String;
	}
}