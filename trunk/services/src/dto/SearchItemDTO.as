package dto
{
	import mx.collections.ArrayCollection;

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
		public var offers:ArrayCollection=new ArrayCollection();
		[Bindable]
		public var currentOfferPage:int=1;
		[Bindable]
		public var totalOfferPages:Array;

		public function setTotalOfferPages(pages:int):void
		{
			var tmp:Array=[];
			for(var i:int=0; i < pages; i++)
			{
				tmp.push(i + 1);
			}
			totalOfferPages=tmp;
		}
	}
}



