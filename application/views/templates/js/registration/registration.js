var fields = [];

fields["input:text[name=first_name]"] = {
										validate: false, 
										name: "hint_text_firstname",
										errorMessage: "Поле \"first Name\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)",
										regexpListener: nameIsCorrect
										};
fields["input:text[name=last_name]"] = {
										validate: false, 
										name: "hint_text_lastname",
										errorMessage: "Поле \"Last Name\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)",
										regexpListener: nameIsCorrect
										};
fields["input:text[name=nick_name]"] = {
										validate: false, 
										name:"hint_text_nickname",
										errorMessage: "Поле \"Nickname\" должно содержать 1 или более символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания)",
										regexpListener: nickNameIsCorrect
										};
fields["input:password[name=password]"] = {
										validate: false, 
										name: "hint_text_password",
										errorMessage: "Поле \"Password\" должно содержать от 3 до 15 символов (a-z, A-Z, а-я, А - Я, 0 - 9, знаки подчеркивания и пробелы)",
										regexpListener: passwordIsCorrect
										};
fields["input:text[name=email]"] = {
										validate: false, 
										name: "hint_text_email",
										errorMessage: "Проверьте корректность введенного e-mail",
										regexpListener: emailIsCorrect
										};

var subdomen = "Hardesy.com";

$(document).ready(function(){
	$( "#message_dialog" ).dialog({
		autoOpen: false,
	      height: 400,
	      width: 350,
	      modal: true
	});
	$( "#datepicker" ).datepicker({
		changeYear: true,
		yearRange: "-100:+0",
		dateFormat: "dd.mm.yy",
		showButtonPanel: true
	});
	$("#button_registration_home_id").click(function(){
		window.location = "/" + subdomen + "/";
	});
	$("#button_registration_id").click(function(){
		/*
		$("input:text[name=fist_name]").val("");
		*/
		if(validateForm())
		{
			$.ajax({
				type: "POST",
				url: "/" + subdomen + "/index.php/registration/userRegistrationData",
				data: {
					firstname: $("input:text[name=first_name]").val(),
					lastname: $("input:text[name=last_name]").val(),
					nickname: $("input:text[name=nick_name]").val(),
					password: $("input:password[name=password]").val(),
					birthday: $("input:text[name=birthday]").val(),
					email: $("input:text[name=email]").val()
				},
				dataType: "json"
			}).done(function(message){
				console.log(message);
				if (message.nickname != '' || message.email != ''){
					var message_dialog_error_head = "<p>Пользователь с указанным(и)</p>";
					var message_dialog_error_end = "<p>уже существует!</p>";
					if (message.nickname != ''){
						message_dialog_error_head += "<p>nickname: " + message.nickname + "</p>"; 
					}
					if (message.email != ''){
						message_dialog_error_head += "<p>email: " + message.email + "</p>"; 
					}
					message_dialog_error_head += message_dialog_error_end;
					$( "#message_dialog" ).html(message_dialog_error_head);
					$( "#message_dialog" ).dialog("open");
				}
			}).fail(function(){
				console.log("fail");
			});
		}
		
	});

	for(var key in fields){
		messageErrorBlurHandler(key);
		messageErrorOffKeydownHandler(key)
	}

});

function validateForm(){
	
	for(var key in fields){
		messageErrorOff(key);
		messageError(key);
	}
	
	return (
			nameIsCorrect($("input:text[name=first_name]").val()) &&
			nameIsCorrect($("input:text[name=last_name]").val()) &&
			nickNameIsCorrect($("input:text[name=nick_name]").val()) &&
			passwordIsCorrect($("input:password[name=password]").val()) &&
			emailIsCorrect($("input:text[name=email]").val())
			);
}

function messageErrorBlurHandler(field_id){
	$(field_id).blur(function(){
		messageError(field_id);
	});
}

function messageError(field_id){
	$("#"+ fields[field_id].name).css({
		top: $(field_id).position().top + 20,
		left: $(field_id).position().left + $(field_id).width() + 70
	});
	if (!fields[field_id].regexpListener($(field_id).val())){
		$("#"+ fields[field_id].name).html(fields[field_id].errorMessage);
		fields[field_id].validate = false;
	} else {
		fields[field_id].validate = true;
	}
}

function messageErrorOffKeydownHandler(field_id){
	$(field_id).keydown(function(){
		messageErrorOff(field_id);
	});
}

function messageErrorOff(field_id){
	$("#"+ fields[field_id].name).html("");
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