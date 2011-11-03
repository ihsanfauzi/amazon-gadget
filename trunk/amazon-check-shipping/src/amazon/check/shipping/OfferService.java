package amazon.check.shipping;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheManager;

import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

import amazon.check.shipping.dto.OfferDTO;

public class OfferService {
	public List<OfferDTO> getOffers(String asin, String country, int page) {
		ArrayList<OfferDTO> res = new ArrayList<OfferDTO>();
		try {
			String content = fetchContent(asin, country, page);
			return extractOffers(content);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return res;
	}

	private List<OfferDTO> extractOffers(String content) {
		return null;
	}

	private String fetchContent(String asin, String country, int page)
			throws IOException {
		Cache cache = null;
		try {
			cache = CacheManager.getInstance().getCacheFactory()
					.createCache(Collections.emptyMap());
		} catch (CacheException e) {
		}
		String content = null;
		if (cache != null) {
			content = (String) cache.get(asin + "-" + country + "-" + page);
		}
		if (content == null) {
			URL url = constructUrl(asin, country, page);
			URLFetchService serv = URLFetchServiceFactory.getURLFetchService();
			HTTPRequest httpReq = new HTTPRequest(url);
			httpReq.setHeader(new HTTPHeader("Accept-Charset", "utf-8"));
			HTTPResponse result = serv.fetch(httpReq);
			List<HTTPHeader> headers = result.getHeaders();
			Charset charset = extractCharset(headers);
			content = new String(result.getContent(), charset);
			// System.out.println(content);
			if (cache != null) {
				cache.put(asin + "-" + country + "-" + page, content);
			}
		}
		return content;
	}

	private URL constructUrl(String asin, String country, int page) {
		return null;
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
