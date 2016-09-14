		<div class="button_exit" id = "button_exit_id">Выход</div>
		<div class="subcontent">
			<div class="image" id="image_id"></div>
			<div class="short_user_data" id="short_user_data_id">
				<?=$firstname?> <?=$lastname?>
			</div>
		</div>
		<div class="button_exit" id = "button_load_image_id">Загрузить фото</div>
		<div id = "upload_file_dialog">
			<?php 
				echo form_open_multipart('');
				echo form_upload('userfile', 'userfile');  
				echo form_submit('submit', 'Отправить');
				echo form_close();
			?>
		</div>
		