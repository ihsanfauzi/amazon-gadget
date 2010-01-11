package services
{
	import com.adobe.serialization.json.JSON;
	
	import dto.SearchDTO;
	import dto.SearchItemDTO;
	
	import flash.external.ExternalInterface;
	
	import mx.rpc.events.ResultEvent;

	public class Helper
	{

		private static const googleText:String="http://ajax.googleapis.com/ajax/services/language/";
		private static const tsrc:String="translate?v=1.0&q=";
		private static const lanpair:String="&langpair=";
		private static const pairCode:String="%7C";

		public function Helper()
		{
		}

		public static function parseGoogleResults(event:ResultEvent):SearchDTO
		{
			var resDTO:SearchDTO=new SearchDTO();
			var rawData:String=String(event.result);
			var responseData:Object=JSON.decode(rawData).responseData;
			var pages:Array=responseData.cursor.pages;
			var pagesCount:int=pages.length;
			var results:Array=responseData.results;
			for each(var r:Object in results)
			{
				var unescapedUrl:String=r.unescapedUrl;
				var title:String=r.title;
				var content:String=r.content;
				var item:SearchItemDTO=new SearchItemDTO();
				var id:String=unescapedUrl.substring(unescapedUrl.indexOf("dp/") + 3);
				id=id.replace("product-description/", "");
				item.id=id;
				item.description=content;
				item.name=title;
				if (unescapedUrl.indexOf("?") != -1)
				{
					item.url=unescapedUrl + "&tag=catalog0e-20";
				}
				else
				{
					item.url=unescapedUrl + "?tag=catalog0e-20";
				}
				resDTO.searchItems.push(item);
			}
			return resDTO;
		}

		public static function createAmazonURL(sdto:SearchDTO):String
		{
			var res:String="http://ws.amazon.com/widgets/q?Operation=GetResults&InstanceId=0&TemplateId=8001&ServiceVersion=20070822&MarketPlace=US&ItemId=";
			for each(var r:SearchItemDTO in sdto.searchItems)
			{
				res+=r.id + ",";
			}
			res=res.substr(0, res.length - 1);
			return res;
		}

		public static function parseAmazonResults(event:ResultEvent):SearchDTO
		{
			var resDTO:SearchDTO=event.token.resultDTO as SearchDTO;
			var rawData:String=String(event.result);
			ExternalInterface.call(rawData);
			var data:Object=ExternalInterface.call("getRawData");
			if (data && data.results)
			{
				for each(var r:Object in data.results)
				{
					var si:SearchItemDTO=findSearchItem(resDTO.searchItems, r.ASIN);
					si.price=r.Price;
					si.rating=r.Rating;
					si.imgSrc=r.ThumbImageUrl;
					if (r.DetailPageURL)
					{
						si.url=r.DetailPageURL + "?ie=UTF8&tag=catalog0e-20";
					}
					si.description+=" <br>" + r.Title + "<br><b>" + r.category + "</b>";
				}
			}

			return resDTO;
		}

		public static function parseTranslateResults(event:ResultEvent):String
		{
			var rawData:String=String(event.result);
			if (JSON.decode(rawData).responseData.translatedText != null)
			{
				var decoded:String=JSON.decode(rawData).responseData.translatedText;
			}
			else
			{
				decoded="None support";
			}
			return decoded;
		}

		public static function createGoogleSearchURL(page:String, keyword:String, category:String):String
		{
			return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=large&start=' + page + '&q=' + encodeURIComponent('inurl:dp site:www.amazon.com ' + keyword + " " + category);
		}

		public static function createTranslateURL(text:String, fromLang:String, toLang:String):String
		{
			return googleText + tsrc + encodeURI(text) + lanpair + fromLang + pairCode + toLang;
		}

		private static function findSearchItem(searchItems:Array, id:String):SearchItemDTO
		{
			for each(var item:SearchItemDTO in searchItems)
			{
				if (item.id == id)
				{
					return item;
				}
			}
			return null;
		}
	}
}