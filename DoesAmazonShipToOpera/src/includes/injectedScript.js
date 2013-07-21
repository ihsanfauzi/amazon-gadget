/**
 * DoesAmazonShipToAddon namespace.
 */
if ("undefined" == typeof (DoesAmazonShipToAddon)) {
	var DoesAmazonShipToAddon = {};
	DoesAmazonShipToAddon.onContentLoadHandler = function() {
		try {
			var current_document = document;
			var hostname = current_document.location.hostname;

			// Skip handle if current browser page is not from Amazon
			if (hostname != "www.amazon.com" && hostname != "www.amazon.de" && hostname != "www.amazon.co.uk" && hostname != "www.amazon.fr")
				return;

			// Find Amazon product page container and add our shipping button to
			// it
			var element = current_document.getElementById("handleBuy");
			if (!element) {
				element = current_document.getElementById("centerCol");
			}
			if (!element) {
				return;
			}
			var span = current_document.createElement("SPAN");
			span.innerHTML = '<br><br><center><div id="ShippingByASINDiv" style="width:300px; height:0px;">\n'
					+ '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"\n'
					+ '		id="ShippingByASIN" width="100%" height="100%"\n'
					+ '		codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">\n'
					+ '		<param name="movie" value="ShippingByASIN.swf" />\n'
					+ '		<param name="quality" value="high" />\n'
					+ '		<param name="bgcolor" value="#ffffff" />\n'
					+ '		<param name="allowScriptAccess" value="sameDomain" />\n'
					+ '		<embed src="http://amazon-gadget.googlecode.com/svn/trunk/amazon-check-shipping/war/dist/ShippingByASIN.swf" quality="high" bgcolor="#ffffff"\n'
					+ '			width="100%" height="100%" name="ShippingByASIN" align="middle"\n'
					+ '			play="true"\n'
					+ '			loop="false"\n'
					+ '			quality="high"\n'
					+ '			allowScriptAccess="always"\n'
					+ '			type="application/x-shockwave-flash"\n'
					+ '			pluginspage="http://www.adobe.com/go/getflashplayer">\n'
					+ '		</embed>\n' + '</object>\n' + '</div></center>	\n';
			element.appendChild(span);
		} catch (exc) {
		}
	};
	window.addEventListener("DOMContentLoaded",
			DoesAmazonShipToAddon.onContentLoadHandler, false);
}