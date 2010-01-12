package dto {

	public class OfferDTO {
		public static const AVAILABILITY_UNDEFINED:int=-1;
		public static const AVAILABILITY_YES:int=1;
		public static const AVAILABILITY_NO:int=0;

		public function OfferDTO() {
		}

		[Bindable]
		public var merchantID:String;
		[Bindable]
		public var merchantName:String;
		[Bindable]
		public var availability:int=AVAILABILITY_UNDEFINED;
		[Bindable]
		public var merchantGlanceURL:String;
		[Bindable]
		public var merchantShippingURL:String;
		[Bindable]
		public var merchantRating:String;
		[Bindable]
		public var offerListingID:String;
		[Bindable]
		public var price:String;
	}
}