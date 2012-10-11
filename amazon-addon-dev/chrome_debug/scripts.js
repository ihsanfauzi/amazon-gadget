var DoesAmazonShipToAddon = {};
DoesAmazonShipToAddon.onContentLoadHandler = function(event) {
	var current_document = event.originalTarget;
	var hostname = current_document.location.hostname;

	// Skip handle if current browser page if it is not from amazon.com
	if (hostname != "www.amazon.com" && hostname != "www.amazon.de" && hostname != "www.amazon.co.uk" && hostname != "www.amazon.fr")
		return;
	// Find Amazon product page container and add our shipping button to it
	var element = current_document.getElementById("handleBuy");
	var span = current_document.createElement("SPAN");
	span.innerHTML = '<br><br><center><div id="ShippingByASINDiv" style="width:300px;">\n'
			+ '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"\n'
			+ '		id="ShippingByASIN" width="100%" height="100%"\n'
			+ '		codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">\n'
			+ '		<param name="movie" value="ShippingByASIN.swf" />\n'
			+ '		<param name="quality" value="high" />\n'
			+ '		<param name="bgcolor" value="#ffffff" />\n'
			+ '		<param name="allowScriptAccess" value="sameDomain" />\n'
			+ '		<embed src="http://localhost:8080/XXXX_LOCAL/ShippingByASIN.swf" quality="high" bgcolor="#ffffff"\n'
			+ '			width="100%" height="100%" name="ShippingByASIN" align="middle"\n'
			+ '			play="true"\n'
			+ '			loop="false"\n'
			+ '			quality="high"\n'
			+ '			allowScriptAccess="always"\n'
			+ '			type="application/x-shockwave-flash"\n'
			+ '			pluginspage="http://www.adobe.com/go/getflashplayer">\n'
			+ '		</embed>\n' + '</object>\n' + '</div></center>	\n';
	element.appendChild(span);
};
var event = {};
event.originalTarget = document;
DoesAmazonShipToAddon.onContentLoadHandler(event);