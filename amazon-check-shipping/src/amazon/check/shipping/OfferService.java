package amazon.check.shipping;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.zip.GZIPInputStream;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheManager;

import amazon.check.shipping.dto.ItemDTO;
import amazon.check.shipping.dto.OfferDTO;
import amazon.check.shipping.dto.OffersDTO;

import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

public class OfferService {
	public ItemDTO getItem(String asin, String country, int page) {
		ItemDTO res = new ItemDTO();
		res.ASIN = asin;
		res.DetailPageURL = "";
		res.Offers = new OffersDTO();
		getOffers(res, asin, country, page);

		return res;
	}

	private List<OfferDTO> getOffers(ItemDTO item, String asin, String country, int page) {
		ArrayList<OfferDTO> res = new ArrayList<OfferDTO>();
		try {
			String content = fetchContent(asin, country, page);
			item.Offers.Offer = extractOffers(content);
			item.Offers.TotalOfferPages = extractTotalPages(content);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return res;
	}

	private int extractTotalPages(String content) {
		content = content.replace("pagenumberon", "pagenumberoff");
		String[] arr = content.split("\"pagenumberoff\"");
		return arr.length - 1;
	}

	private List<OfferDTO> extractOffers(String content) {
		ArrayList<OfferDTO> res = new ArrayList<OfferDTO>();
		List<String> tbodyResults = extractTBodyResults(content);
		for (String tbodyResult : tbodyResults) {
			res.add(extractOfferDTO(tbodyResult));
		}
		return res;
	}

	private OfferDTO extractOfferDTO(String tbodyResult) {
		OfferDTO res = new OfferDTO();
		extractSellerInfo(res, tbodyResult);
		extractPrice(res, tbodyResult);
		return res;
	}

	private void extractPrice(OfferDTO res, String info) {
		// <span class="price">
		String sStart = "<span class=\"price\">";
		int start = info.indexOf(sStart) + sStart.length();
		String subStr = info.substring(start);
		String sPrice = subStr.substring(0, subStr.indexOf("</span>"));
		if (sPrice.indexOf("<span>") != -1) {
			sPrice = "-";
		}
		res.OfferListing.Price.FormattedPrice = sPrice;
	}

	private void extractSellerInfo(OfferDTO res, String tbodyResult) {
		String sStart = "<ul class=\"sellerInformation\">";
		String sEnd = "</ul>";
		int start = tbodyResult.indexOf(sStart);
		String subStr = tbodyResult.substring(start);
		int end = subStr.indexOf(sEnd) + sEnd.length();
		String sRes = subStr.substring(0, end);
		extractMerchantID(res, sRes);
		extractMerhantName(res, sRes);
		extractMerhantInternational(res, sRes);
	}

	private void extractMerhantInternational(OfferDTO res, String sRes) {
		// TODO Auto-generated method stub

	}

	private void extractMerhantName(OfferDTO res, String info) {
		// <img width="120" height="30" border="0" alt="
		String sStart = " alt=\"";
		int start = info.indexOf(sStart) + sStart.length();
		if (start == sStart.length() - 1) {
			extractMerhantNameB(res, info);
			return;
		}
		String subStr = info.substring(start);
		String sName = subStr.substring(0, subStr.indexOf("\""));
		if (sName.length() == 0) {
			extractMerhantNameB(res, info);
			return;
		}
		res.Merchant.Name = sName;
	}

	private void extractMerhantNameB(OfferDTO res, String info) {
		String sStart = "<b>";
		int start = info.indexOf(sStart) + sStart.length();
		if (start == sStart.length() - 1) {
			res.Merchant.Name = "n/a";
			return;
		}
		String subStr = info.substring(start);
		String sName = subStr.substring(0, subStr.indexOf("</b>"));
		res.Merchant.Name = sName;
	}

	private void extractMerchantID(OfferDTO res, String info) {
		String sStart = "seller=";
		int start = info.indexOf(sStart) + sStart.length();
		String subStr = info.substring(start);
		String sID = subStr.substring(0, subStr.indexOf("\""));
		res.Merchant.MerchantId = sID;
	}

	private List<String> extractTBodyResults(String content) {
		ArrayList<String> res = new ArrayList<String>();
		try {
			String sStart = "<tbody class=\"result\">";
			String sEnd = "</tbody>";
			while (true) {
				int start = content.indexOf(sStart) + sStart.length();
				if (start == sStart.length() - 1) {
					break;
				}
				String subStr = content.substring(start);
				int end = subStr.indexOf(sEnd);
				String sRes = subStr.substring(0, end);
				res.add(sRes);
				content = subStr;
			}
		} catch (Throwable e) {
		}
		return res;
	}

	private String fetchContent(String asin, String country, int page) throws Exception {
		Cache cache = null;
		try {
			cache = CacheManager.getInstance().getCacheFactory().createCache(Collections.emptyMap());
		} catch (CacheException e) {
		}
		String content = null;
		if (cache != null) {
			// content = (String) cache.get(asin + "-" + country + "-" + page);
		}
		if (content == null) {
			URL url = constructUrl(asin, country, page);
			URLFetchService serv = URLFetchServiceFactory.getURLFetchService();
			HTTPRequest httpReq = new HTTPRequest(url);
			httpReq.setHeader(new HTTPHeader("Accept-Charset", "utf-8"));
			httpReq.setHeader(new HTTPHeader("Accept-Encoding", "gzip, deflate"));
			HTTPResponse result = serv.fetch(httpReq);
			List<HTTPHeader> headers = result.getHeaders();
			Charset charset = extractCharset(headers);
			byte[] zipped = result.getContent();
			GZIPInputStream gis = new GZIPInputStream(new ByteArrayInputStream(zipped));
			content = new String(toByteArray(gis), charset);
			// System.out.println(content);
			if (cache != null) {
				cache.put(asin + "-" + country + "-" + page, content);
			}
		}
		return content;
	}

	public static byte[] toByteArray(InputStream is) throws IOException {
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		int nRead;
		byte[] data = new byte[16384];
		while ((nRead = is.read(data, 0, data.length)) != -1) {
			buffer.write(data, 0, nRead);
		}
		buffer.flush();
		return buffer.toByteArray();
	}

	private URL constructUrl(String asin, String country, int page) throws Exception {
		int startIndex = (page - 1) * 15;
		String res = "http://www.amazon." + country + "/gp/offer-listing/" + asin + "/?ie=UTF8&startIndex=" + startIndex + "&condition=new";
		return new URL(res);
	}

	private Charset extractCharset(List<HTTPHeader> headers) {
		for (HTTPHeader header : headers) {
			// System.err.println("Ok0 "+header.getName());
			if ("content-type".equals(header.getName().toLowerCase())) {
				// System.err.println("Ok1");
				String contentType = header.getValue();
				String[] entries = contentType.split(";");
				for (String entry : entries) {
					// System.err.println("Ok2");
					entry = entry.trim();
					if (entry.toLowerCase().startsWith("charset=")) {
						// System.err.println("Ok3 "+entry);
						String ch = entry.substring(entry.lastIndexOf("=") + 1);
						if (ch != null && ch.length() > 0) {
							Charset res = Charset.forName(ch);
							// System.err.println("Charset " +
							// res.displayName());
							return res;
						}
					}
				}
			}
		}

		return Charset.defaultCharset();
	}
}
