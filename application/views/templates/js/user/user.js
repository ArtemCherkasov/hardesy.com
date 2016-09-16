var subdomen = "Hardesy.com";+

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
	$("#upload_file_dialog").dialog({
	      autoOpen: false,
	      height: 400,
	      width: 300,
	      modal: true
	});
	$("#button_load_image_id").click(function(){
		$("#upload_file_dialog").dialog("open");
	});
});