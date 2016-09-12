var fields = [];
fields["input:text[name=first_name]"] = "hint_text_firstname";
fields["input:text[name=last_name]"] = "hint_text_lastname";
fields["input:text[name=nick_name]"] = "hint_text_nickname";
fields["input:password[name=password]"] = "hint_text_password";
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
		$.ajax({
			type: "POST",
			url: "/index.php/registration/userRegistrationData",
			data: {
				firstname: $("input:text[name=first_name]").val(),
				lastname: $("input:text[name=last_name]").val(),
				nickname: $("input:text[name=nick_name]").val(),
				birthday: $("input:text[name=birthday]").val(),
				email: $("input:text[name=email]").val()
			},
			dataType: "json"
		}).done(function(message){
			console.log(message);
		}).fail(function(){
			console.log("fail");
		});
	});
	
	messageErrorOn("input:text[name=first_name]", "Поле \"first Name\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)", nameIsCorrect);
	messageErrorOn("input:text[name=last_name]", "Поле \"Last Name\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)", nameIsCorrect);
	messageErrorOn("input:text[name=nick_name]", "Поле \"Nickname\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания)", nickNameIsCorrect);
	messageErrorOn("input:password[name=password]", "Поле \"Password\" должно содержать от 3 до 15 символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)", passwordIsCorrect);
	messageErrorOn("input:text[name=email]", "Проверьте корректность введенного e-mail", emailIsCorrect);
	messageErrorOff("input:text[name=first_name]");
	messageErrorOff("input:text[name=last_name]");
	messageErrorOff("input:text[name=nick_name]");
	messageErrorOff("input:password[name=password]");
	messageErrorOff("input:text[name=email]");
});

function messageErrorOn(field_id, message, exam_function){
	$(field_id).blur(function(){
		$("#"+ fields[field_id]).css({
			top: $(field_id).position().top + 20,
			left: $(field_id).position().left + $(field_id).width() + 70
		});
		if (!exam_function($(field_id).val())){
			console.log( $(field_id).val() );
			$("#"+ fields[field_id]).html(message);
		}
		
	});
}

function messageErrorOff(field_id){
	$(field_id).keydown(function(){
		$("#"+ fields[field_id]).html("");
	});
}

function nameIsCorrect(name){
	var regexp = new RegExp("^[a-zA-Zа-яА-Я0-9 _]{1,25}$");
	return regexp.test(name);
}

function nickNameIsCorrect(name){
	var regexp = new RegExp("^[a-zA-Zа-яА-Я0-9_]{1,25}$");
	return regexp.test(name);
}

function passwordIsCorrect(pass){
	var regexp = new RegExp("^\\w{3,15}$");
	return regexp.test(pass);
}

function emailIsCorrect(pass){
	var regexp = new RegExp("^\\w{1,50}@{1}\\S{1,50}$");
	return regexp.test(pass);
}