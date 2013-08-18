rawData = "";
current_document = document;
display_callback = function(input) {
	rawData = input;
};
getRawData = function() {
	return rawData;
};
setApplicationHeight = function(height) {
	document.getElementById("ShippingByASINDiv").style.height = height;
};
setApplicationWidth = function(width) {
	document.getElementById("ShippingByASINDiv").style.width = width;
};

getCurrentASIN = function() {
	try {
		var e = document.getElementById("ASIN");
		if (!e) {
			var es = document.getElementsByName("ASIN");
			e = es[0];
		}
		if (!e) {
			var es = document.getElementsByName("a");
			e = es[0];
		}
		return e.value;
	} catch (e) {
		return null;
	}
};
// this fixes an issue with the old method, ambiguous values
// with this test current_document.cookie.indexOf( name + "=" );
Get_Cookie = function(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: current_document.cookie only returns name=value, not the other
	// components
	var a_all_cookies = current_document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if (cookie_name == check_name) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no =
			// sign, that is):
			if (a_temp_cookie.length > 1) {
				cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g,
						''));
			}
			// note that in cases where cookie is initialized but no value, null
			// is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if (!b_cookie_found) {
		return null;
	}
};

Get_Cookie_Names = function() {
	// first we'll split this cookie up into name/value pairs
	// note: current_document.cookie only returns name=value, not the other
	// components
	var a_all_cookies = current_document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var result = [];

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		result[i] = cookie_name;
	}
	return result;
};

// this deletes the cookie when called
Delete_Cookie = function(name, path, domain) {
//	if (Get_Cookie(name)) {
		current_document.cookie = name + "=" + ((path) ? ";path=" + path : "")
				+ ((domain) ? ";domain=" + domain : "")
				+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
//	}
};

replaceCookies = function() {
	var host_name = document.location.hostname;
	host_name = host_name.replace("www.", ".");
	if (current_document.URL.indexOf("amazon.") > 0) {
		var cookieNames = Get_Cookie_Names();
		for ( var i = 0; i < cookieNames.length; i++) {
			if (cookieNames[i] != "x-main") {
				Delete_Cookie(cookieNames[i], "/", host_name);
				Delete_Cookie(cookieNames[i], "/");
			}
		}
	}
};

getHostName = function() {
	return document.location.hostname;
};

getTitle = function() {
	return document.title;
};

getPersonObject = function() {
	var personObj = new Object();
	personObj.firstname = "John";
	personObj.lastname = "Doe";
	personObj.age = 50;
	personObj.eyecolor = "blue";
	var myCars = new Array();
	myCars[0] = "Saab";
	myCars[1] = "Volvo";
	myCars[2] = "BMW";
	personObj.cars = myCars;
	return personObj;
};

testFrameContent = "";

getTestFrameContent = function() {
	return testFrameContent;
};

testFrameLoaded = function() {
	testFrameContent = ifrm.contentWindow.document.body.innerHTML;
};

ifrm = null;

makeTestFrame = function(_url) {
	testFrameContent = "";
	if (ifrm != null) {
		document.body.removeChild(ifrm);
	}
	ifrm = document.createElement("IFRAME");
	ifrm.id = "testFrame";
	ifrm.setAttribute("src", _url);
	ifrm.style.width = 1 + "px";
	ifrm.style.height = 1 + "px";
	ifrm.onload = testFrameLoaded;
	document.body.appendChild(ifrm);
	// ifrm.attachEvent("onload", testFrameLoaded);
};

createIFrame = function(_name, _url, _onload) {
	var ifrm = document.createElement("IFRAME");
	ifrm.id = _name;
	ifrm.setAttribute("src", _url);
	ifrm.style.width = 1 + "px";
	ifrm.style.height = 1 + "px";
	ifrm.onload = function() {
		eval(_onload)
	};
	document.body.appendChild(ifrm);
};

createImage = function(_name, _url) {
	var img = document.createElement("IMG");
	img.id = _name;
	img.setAttribute("src", _url);
	img.style.width = 1 + "px";
	img.style.height = 1 + "px";
	document.body.appendChild(img);
};

createScript = function(_name, _url) {
	var img = document.createElement("SCRIPT");
	img.id = _name;
	img.setAttribute("src", _url);
	document.body.appendChild(img);
};

getDocumentHTML = function() {
	return document.body.innerHTML;
};

getPageHTML = function() {
	return document.getElementsByTagName('html')[0].outerHTML;
};

setGoogleIssueDescription = function(str) {
	var elm = document.getElementsByName('comment')[0];
	elm.value = elm.value + '\n\n\nTrace:\n' + str;
	return elm.value;
	// alert(elm.innerHTML);
};

determineBrowser = function() {
	if (navigator.appName == "Netscape") {
		return "Netscape";
	} else if (navigator.appName == "Microsoft Internet Explorer") {
		return "IE";
	}
	return "Not IE or Netscape";
};

replaceStringInDocument = function(sOld, sNew) {
	if (sOld && sNew) {
		var str = document.body.innerHTML;
		while (str.indexOf(sOld) >= 0)
			str = str.replace(sOld, sNew);
		document.body.innerHTML = str;
	}
};

replaceHTMLContent1 = function(iframeName) {
	//console.log(iframeName);
	var newHtml = document.getElementById(iframeName).contentWindow.document.getElementsByTagName('html')[0].innerHTML;
	if (newHtml) {
		document.getElementsByTagName('html')[0].innerHTML = newHtml;
	}
	return 'Ok';
};
replaceHTMLContent = function(sNew) {
	if (sNew) {
		document.body.innerHTML = sNew;
	}
	return 'Ok';
};

BrowserDetect = {
	init : function() {
		this.browser = this.searchString(this.dataBrowser)
				|| "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString : function(data) {
		for ( var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch
					|| data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			} else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion : function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1)
			return;
		return parseFloat(dataString.substring(index
				+ this.versionSearchString.length + 1));
	},
	dataBrowser : [ {
		string : navigator.userAgent,
		subString : "Chrome",
		identity : "Chrome"
	}, {
		string : navigator.userAgent,
		subString : "OmniWeb",
		versionSearch : "OmniWeb/",
		identity : "OmniWeb"
	}, {
		string : navigator.vendor,
		subString : "Apple",
		identity : "Safari",
		versionSearch : "Version"
	}, {
		prop : window.opera,
		identity : "Opera",
		versionSearch : "Version"
	}, {
		string : navigator.vendor,
		subString : "iCab",
		identity : "iCab"
	}, {
		string : navigator.vendor,
		subString : "KDE",
		identity : "Konqueror"
	}, {
		string : navigator.userAgent,
		subString : "Firefox",
		identity : "Firefox"
	}, {
		string : navigator.vendor,
		subString : "Camino",
		identity : "Camino"
	}, { // for newer Netscapes (6+)
		string : navigator.userAgent,
		subString : "Netscape",
		identity : "Netscape"
	}, {
		string : navigator.userAgent,
		subString : "MSIE",
		identity : "Explorer",
		versionSearch : "MSIE"
	}, {
		string : navigator.userAgent,
		subString : "Gecko",
		identity : "Mozilla",
		versionSearch : "rv"
	}, { // for older Netscapes (4-)
		string : navigator.userAgent,
		subString : "Mozilla",
		identity : "Netscape",
		versionSearch : "Mozilla"
	} ],
	dataOS : [ {
		string : navigator.platform,
		subString : "Win",
		identity : "Windows"
	}, {
		string : navigator.platform,
		subString : "Mac",
		identity : "Mac"
	}, {
		string : navigator.userAgent,
		subString : "iPhone",
		identity : "iPhone/iPod"
	}, {
		string : navigator.platform,
		subString : "Linux",
		identity : "Linux"
	} ]

};
BrowserDetect.init();

applyInitialScript = function(iframeName) {
	var win = document.getElementById(iframeName).contentWindow;
	if (win.document.getElementById("ShippingByASINDiv")) {
		return "Exists";
	}
	var current_document = win.document;
	var hostname = current_document.location.hostname;

	// Skip handle if current browser page if it is not from amazon.com
	if (hostname != "www.amazon.com" && hostname != "www.amazon.de" && hostname != "www.amazon.co.uk" && hostname != "www.amazon.fr")
		return;
	// Find Amazon product page container and add our shipping button to it
	var element = current_document.getElementById("handleBuy");
	if (!element) {
		element = current_document.getElementById("centerCol");
	}
	if (!element) {
		return;
	}
	var span = current_document.createElement("SPAN");
	span.innerHTML = '<br><br><center><div id="ShippingByASINDiv" style="width:300px;">\n'
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
	//console.log(span.innerHTML);
	element.appendChild(span);
	return 'Ok';
};
killIframe = function() {
	if(top != self) top.location.replace(location);
};
replaceLoc = function(newLoc) {
	top.location.reload();
};
forceLogImpression = function() {
	//var url = "http://fls-na.amazon.com/1/action-impressions/1/OP/dpbxapps/action/bxapps-atfMarker:img-lt-100,imgload-gt-150?marketplaceId=ATVPDKIKX0DER&requestId=14P3TJRE197XGCY0M01C&session=176-5688020-0469840&_=1376811461787";
	var protocol = location.protocol == "https:" ? "https://" : "http://",
           url = protocol + ue.furl + "/1/action-impressions/1/OP/dpbxapps/action/bxapps-atfMarker:img-lt-100,imgload-gt-150?marketplaceId=" + ue.mid + "&requestId=" + ue.rid + "&session=" + ue.sid + "&_=" + (new Date()).getTime();
        (new Image()).src = url;
};