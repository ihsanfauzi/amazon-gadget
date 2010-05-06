package amazon.check.shipping;

import java.io.IOException;
import java.net.URL;
import java.util.Collections;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheManager;
import javax.servlet.http.*;

import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

@SuppressWarnings("serial")
public class Amazon_check_shippingServlet extends HttpServlet {

	private Cache cache;

	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		String seller = req.getParameter("seller");
		String store = req.getParameter("store");
		String region = req.getParameter("region");
		if (!isEmpty(seller) && !isEmpty(store) && !isEmpty(region)) {
			if (cache == null) {
				try {
					cache = CacheManager.getInstance().getCacheFactory()
							.createCache(Collections.emptyMap());
				} catch (CacheException e) {
				}
			}
			String content = (String) cache.get(seller);
			if (content == null) {
				URL url = new URL("http://" + store
						+ "/gp/help/seller/shipping.html?ie=UTF8&seller="
						+ seller);
				URLFetchService serv = URLFetchServiceFactory
						.getURLFetchService();
				HTTPRequest httpReq = new HTTPRequest(url);
				httpReq.setHeader(new HTTPHeader("Accept-Charset", "utf-8"));
				HTTPResponse result = serv.fetch(httpReq);
				content = new String(result.getContent());
				//System.out.println(content);
				cache.put(seller, content);
			}
			resp.setContentType("text/plain");
			resp.getWriter().print(checkShipping(store, region, content));
		}
	}

	private char[] checkShipping(String store, String region, String content) {
		BaseChecker ch = CheckerFactory.getChecker(store);
		if (ch != null) {
			int res = ch.check(region, content);
			return String.valueOf(res).toCharArray();
		}
		return new char[] { '0' };
	}

	private static boolean isEmpty(String s) {
		return s == null || s.trim().length() == 0;
	}
}
