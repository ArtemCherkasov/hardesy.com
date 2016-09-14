var subdomen = "Hardesy.com";
$(document).ready(function(){
	/*
	for(var i = 1; i <= 20; ++i){
		$("body").append("<div class=day>" + i + "</div>");
	}
	for(var i = 21; i <= 30; ++i){
		$("body").append("<div class=empty_day>" + i + "</div>");
	}
	*/
	$("#id_button_registration").click(function(){
		window.location = "/" + subdomen + "/index.php/registration";
		//window.location = "/index.php/registration";
	});
	
	$("#id_button_login").click(function(){
		login();
	});
	
	$("input:password[name=password]").keypress(function(){
		login();
	});
});

function login(){
	$.ajax({
		type: "POST",
		url: "/" + subdomen + "/index.php/user/login",
		data: {
			login: $("input:text[name=login]").val(),
			password: $("input:password[name=password]").val()
		},
		dataType: "json"
	}).done(function(message){
		console.log(message);
		if (message.result == "success"){
			window.location = "/" + subdomen + "/index.php/user";
		}
	}).fail(function(){
		console.log("fail");
	});
}