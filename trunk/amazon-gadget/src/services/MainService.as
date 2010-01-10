package services
{
	import mx.utils.URLUtil;
	import com.adobe.serialization.json.JSON;
	
	public class MainService
	{
		public function MainService()
		{
		}
		
		public static function getGoogleSearchContent(String keyword, int page):SearchDTO {
			var res:Array = [];
			var google_url:String = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=large&start="
					+ page
					+ "&q=" + encodeURIComponent("inurl:dp site:www.amazon.com "+keyword);
			
			
			String content = retrieveContent(google_url);

			JSONObject json = new JSONObject(content);
			JSONArray jsonArr = json.getJSONObject("responseData")
					.getJSONArray("results");
			JSONArray pagesArr = json.getJSONObject("responseData")
					.getJSONObject("cursor").getJSONArray("pages");
			int pagesCount = pagesArr.length();
			for (int i = 0; i < jsonArr.length(); i++) {
				String url = (String) jsonArr.getJSONObject(i).get(
						"unescapedUrl");
				String title = (String) jsonArr.getJSONObject(i).get("title");
				String description = (String) jsonArr.getJSONObject(i).get(
						"content");
				SearchItemDTO gsr = new SearchItemDTO();
				gsr.setUrl(url);
				String id = url.substring(url.indexOf("dp/") + 3);
				gsr.setId(id);
				gsr.setName(title);
				gsr.setDescription(description);
				res.add(gsr);
			}
			SearchDTO result = new SearchDTO();
			result.setSearchItems(res);
			result.setPagesCount(pagesCount);
			return result;
		return null;
	}

	}
}