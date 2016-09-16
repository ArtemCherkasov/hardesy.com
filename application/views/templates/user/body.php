		
		<div class="subcontent">
			<table style="text-align: left;">
				<tr style="vertical-align: top;">
					<td><div class="image" id="image_id" style="width: <?=$avatar_width?>; height: <?=$avatar_height?>; background-image: url(<?=".".$image_link?>)"></div></td>
					<td><div class="short_user_data" id="short_user_data_id">
						<div class="user_name"><?=$firstname?> <?=$lastname?></div>
						<div class="email"><?=$email?></div>
					</div></td>
				</tr>
			</table>
			
			
		</div>
		<div class="button_block">
			
			<div class="button_pc" id = "button_load_image_id">Загрузить фото</div>
			<div class="button_pc" id = "button_exit_id">Выход</div>
		</div>
		<div id = "upload_file_dialog">
			<?php
				echo form_open_multipart('');
				echo form_upload('userfile', 'userfile');  
				echo form_submit('submit', 'Отправить');
				echo form_close();
			?>
		</div>
		
		