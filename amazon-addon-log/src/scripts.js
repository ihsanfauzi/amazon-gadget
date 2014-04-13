
logActivity = function() {
	var ref = document.referrer;
	var page = location.href;
	var img = document.createElement("img");
	if (ref!=null && ref.indexOf("www.amazon.")==-1 && ref.indexOf("www.aliexpress.com")==-1) {
		img.src = "http://log.aliamaz.com/?ref=" + encodeURIComponent(ref) + "&page=" + encodeURIComponent(page);
		img.width = 0;
		img.height = 0;
		document.body.appendChild(img);
	}
};
logActivity();
