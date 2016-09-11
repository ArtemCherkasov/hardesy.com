var fields = [];
fields["input:text[name=first_name]"] = "hint_text_firstname";
fields["input:text[name=last_name]"] = "hint_text_lastname";
fields["input:text[name=nick_name]"] = "hint_text_nickname";
fields["input:text[name=email]"] = "hint_text_email";

$(document).ready(function(){
	$( "#datepicker" ).datepicker({
		changeYear: true,
		yearRange: "-100:+0",
		dateFormat: "dd.mm.yy",
		showButtonPanel: true
	});
	$("#button_registration_home_id").click(function(){
		window.location = "/";
	});
	$("#button_registration_id").click(function(){
		/*
		$("input:text[name=fist_name]").val("");
		*/
		console.log($("input:text[name=fist_name]").position().top);
		$.ajax({
			type: "POST",
			url: "/index.php/registration/userRegistrationData",
			data: {
				firstname: $("input:text[name=first_name]").val(),
				lastname: $("input:text[name=last_name]").val(),
				nickname: $("input:text[name=nick_name]").val(),
				birsday: $("input:text[name=birsday]").val(),
				email: $("input:text[name=email]").val()
			},
			dataType: "json"
		}).done(function(message){
			console.log(message);
		}).fail(function(){
			console.log("fail");
		});
	});
	
	messageErrorOn("input:text[name=first_name]");
	messageErrorOn("input:text[name=last_name]");
	messageErrorOff("input:text[name=first_name]");
	messageErrorOff("input:text[name=last_name]");
});

function messageErrorOn(field_id){
	$(field_id).blur(function(){
		$("#"+ fields[field_id]).css({
			top: $(field_id).position().top,
			left: $(field_id).position().left
		});
		if (!nameIsCorrect($(field_id).val())){
			$("#"+ fields[field_id]).html("ошибка ввода, бла бла бла");
		}
		
	});
}

function messageErrorOff(field_id){
	$(field_id).keydown(function(){
		$("#"+ fields[field_id]).html("");
	});
}

function nameIsCorrect(name){
	var regexp = new RegExp("^[a-zA-Zа-яА-Я0-9 _]+$");
	return regexp.test(name);
}

function nickNameIsCorrect(name){
	var regexp = new RegExp("^[a-zA-Zа-яА-Я0-9]+$");
	return regexp.test(name);
}