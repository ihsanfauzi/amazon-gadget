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
};
// this fixes an issue with the old method, ambiguous values
// with this test current_document.cookie.indexOf( name + "=" );
Get_Cookie = function(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: current_document.cookie only returns name=value, not the other
	// components
	var a_all_cookies = current_document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no =
			// sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null
			// is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
};

Get_Cookie_Names = function() {
	// first we'll split this cookie up into name/value pairs
	// note: current_document.cookie only returns name=value, not the other
	// components
	var a_all_cookies = current_document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var result = [];

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		result[i] = cookie_name; 
	}
	return result;
};

// this deletes the cookie when called
Delete_Cookie = function ( name, path, domain ) {
	if ( Get_Cookie( name ) ){
		current_document.cookie = name + "=" +	( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
};

replaceCookies = function() {
	var host_name = document.location.hostname;
	host_name = host_name.replace("www.", ".");
	if(current_document.URL.indexOf("amazon.")>0) {
		var cookieNames = Get_Cookie_Names();
		for (var i = 0; i < cookieNames.length; i++ )
		{
			if(cookieNames[i] != "x-main"){
				Delete_Cookie(cookieNames[i], "/", host_name);
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
	var personObj=new Object();
	personObj.firstname="John";
	personObj.lastname="Doe";
	personObj.age=50;
	personObj.eyecolor="blue";
	var myCars=new Array(); 
	myCars[0]="Saab";       
	myCars[1]="Volvo";
	myCars[2]="BMW";
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
	if (ifrm!=null) {
		document.body.removeChild(ifrm);
	}
	ifrm = document.createElement("IFRAME");
	ifrm.id = "testFrame";
	ifrm.setAttribute("src", _url);
	ifrm.style.width = 1+"px";
	ifrm.style.height = 1+"px";
	ifrm.onload = testFrameLoaded;
	document.body.appendChild(ifrm);
	//ifrm.attachEvent("onload", testFrameLoaded);
};

createIFrame = function(_name, _url, _onload) {
	var ifrm = document.createElement("IFRAME");
	ifrm.id = _name;
	ifrm.setAttribute("src", _url);
	ifrm.style.width = 1+"px";
	ifrm.style.height = 1+"px";
	ifrm.onload = function(){eval(_onload)};
	document.body.appendChild(ifrm);
};

createImage = function(_name, _url) {
	var img = document.createElement("IMG");
	img.id = _name;
	img.setAttribute("src", _url);
	img.style.width = 1+"px";
	img.style.height = 1+"px";
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
}

getPageHTML = function() {
	return document.getElementsByTagName('html')[0].outerHTML;
}