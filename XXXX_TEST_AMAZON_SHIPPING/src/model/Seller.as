package model
{
	import mx.collections.ArrayCollection;
	
	[Bindable]
	public class Seller
	{
		public function Seller()
		{
		}
		
		public var id:String;
		public var name:String;
		public var url:String;
		public var regionShippings:ArrayCollection;
		public var content:String;
		public var store:String;
		
	}
}