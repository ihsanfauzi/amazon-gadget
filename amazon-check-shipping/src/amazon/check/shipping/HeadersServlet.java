package amazon.check.shipping;

import java.io.IOException;
import java.util.Enumeration;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HeadersServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(HeadersServlet.class.getName());
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Enumeration names = req.getHeaderNames();
		while (names.hasMoreElements()) {
			String name = (String) names.nextElement();
			log.severe(name + ": " + req.getHeader(name));
		}
	}
}
