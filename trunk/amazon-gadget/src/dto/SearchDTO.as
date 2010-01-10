package dto
{
	public class SearchDTO
	{
		public function SearchDTO():void
		{
		}
		[Bindable]
		public var searchItems:Array=[];
		[Bindable]
		public var pagesCount:int=0;
	}
}