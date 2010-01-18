package dto
{

	public class SearchItemDTO
	{

		public function SearchItemDTO()
		{
		}
		[Bindable]
		public var name:String;
		[Bindable]
		public var description:String;
		[Bindable]
		public var originalUrl:String;
		[Bindable]
		public var url:String;
		[Bindable]
		public var rating:String;
		[Bindable]
		public var price:String;
		[Bindable]
		public var id:String;
		[Bindable]
		public var imgSrc:String;
		[Bindable]
		public var imgWidth:String;
		[Bindable]
		public var imgHeight:String;
		[Bindable]
		public var offers:Array = [];
	}
}

