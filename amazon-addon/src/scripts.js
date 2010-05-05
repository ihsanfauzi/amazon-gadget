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
getCurrentASIN = function() {
	return document.getElementById("ASIN").value;
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
	if(current_document.URL.indexOf("amazon.com")>0) {
		var cookieNames = Get_Cookie_Names();
		for (var i = 0; i < cookieNames.length; i++ )
		{
			if(cookieNames[i] != "x-main"){
				Delete_Cookie(cookieNames[i], "/", ".amazon.com");
			}
		}
		//var img = current_document.createElement("img");
		//img.src = "http://www.amazon.com/?tag=zzzzzzzzzzz-20";
		// alert(current_document.location.href);
	}
	//alert(current_document.location.href);
};