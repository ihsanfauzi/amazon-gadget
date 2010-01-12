package dto
{
	import mx.collections.ArrayCollection;
	
	public class SearchDTO
	{
		public function SearchDTO():void
		{
		}
		[Bindable]
		public var searchItems:ArrayCollection=new ArrayCollection();
		[Bindable]
		public var pagesCount:int=0;
	}
}