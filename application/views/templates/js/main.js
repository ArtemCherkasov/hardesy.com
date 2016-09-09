$(document).ready(function(){
	for(var i = 1; i <= 20; ++i){
		$("body").append("<div class=day>" + i + "</div>");
	}
	for(var i = 21; i <= 30; ++i){
		$("body").append("<div class=empty_day>" + i + "</div>");
	}
});
