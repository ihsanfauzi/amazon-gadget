rawData = "";
display_callback = function(input) {
	rawData = input;
}
getRawData = function() {
	return rawData;
}
setApplicationHeight = function(height) {
	document.getElementById("ShippingByASINDiv").style.height = height;
}
getCurrentASIN = function() {
	return document.getElementById("ASIN").value;
}
alert("Ok");