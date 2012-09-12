package amazon.check.shipping;

import java.net.URL;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.List;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheManager;

import amazon.check.shipping.dto.ShippingDTO;
import amazon.check.shipping.dto.ShippingPriceDTO;

import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

public class ShippingService {
	private static Cache cache;
	@SuppressWarnings("unchecked")
	public ShippingDTO checkShipping(String seller, String store, String region) throws Exception {
		if ("null".equals(seller)) {
			seller = "amazon";
		}
		if (!isEmpty(seller) && !isEmpty(store) && !isEmpty(region)) {
			String content = null;
			if ("amazon".equals(seller)) {
				content = "amazon";
			}
			if (cache == null) {
				try {
					cache = CacheManager.getInstance().getCacheFactory()
							.createCache(Collections.emptyMap());
				} catch (CacheException e) {
				}
			}
			if (content == null) {
				content = (String) cache.get(store + "-" + seller);
			}
			if (content == null) {
				URL url = new URL("http://" + store
						+ "/gp/help/seller/shipping.html?ie=UTF8&seller="
						+ seller);
				URLFetchService serv = URLFetchServiceFactory
						.getURLFetchService();
				HTTPRequest httpReq = new HTTPRequest(url);
				httpReq.setHeader(new HTTPHeader("Accept-Charset", "utf-8"));
				HTTPResponse result = serv.fetch(httpReq);
				List<HTTPHeader> headers = result.getHeaders();
				Charset charset = extractCharset(headers);
				content = new String(result.getContent(), charset);
				// System.out.println(content);
				cache.put(store + "-" + seller, content);
			}
			ShippingDTO dto = new ShippingDTO();
			dto.availability = checkShippingInternal(store, region, content);
			if (dto.availability == 1) {
				calculateShippingPriceInternal(store, region, content, dto);
			}
			return dto;
		}
		return null;
	}
	
	private void calculateShippingPriceInternal(String store, String region, String content, ShippingDTO dto) {
		BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(store);
		if (c!=null) {
			ShippingPriceDTO res = c.calculate(region, content);
			dto.shippingPrice = res;
		}
	}

	private int checkShippingInternal(String store, String region, String content) {
//		int start = content.indexOf("Versandkosten und Lieferzeiten");
//		if (start > 0) {
//			// System.err.println(content.substring(start));
//		}
		BaseChecker ch = CheckerFactory.getChecker(store);
		if (ch != null) {
			int res = ch.check(region, content);
			return res;
		}
		return 0;
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
	
	private static boolean isEmpty(String s) {
		return s == null || s.trim().length() == 0 || s.equals("null");
	}
}
