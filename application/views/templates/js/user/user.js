var subdomen = "Hardesy.com";

$(document).ready(function(){

	$("#button_exit_id").click(function(){

		$.ajax({
			type: "POST",
			url: "/" + subdomen + "/index.php/user/closeSession",
			data: {
			},
			dataType: "json"
		}).done(function(message){
			window.location = "/" + subdomen;
		}).fail(function(){
			console.log("fail");
		});

	});


});