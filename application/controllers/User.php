<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public $session_data = array(
			"nickname" => "",
			"email" => "",
			"logged" => false
	);
	public $width_constant = 1024;
	public $height_constant = 768;
	
	public function view()
	{
		$this->load->helper('form');
		$this->load->helper('url');
		$this->load->database();
		$this->load->library('session');
		$session_data = $this->session->userdata();
		var_dump($session_data);
		
		if($this->input->post('submit')){
			$config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'gif|jpg|jpeg|png';
			$config['file_name'] = md5($session_data['nickname']);
			
			$this->load->library('upload', $config);
			$this->upload->overwrite = true;
			
			var_dump($session_data['image_link']);
			if (file_exists($session_data['image_link'])){
				echo 'FILE EXIST';
				$this->load->helper("file");
				
				delete_files($session_data['image_link']);
			} else {
				echo 'FILE NOT EXIST';
			}
			
			if($this->upload->do_upload('userfile')){
				
				$upload_data = $this->upload->data();
				$source = $upload_data['full_path'];
				$session_data['image_link'] = $config['upload_path'].$upload_data['file_name'];
				$this->session->set_userdata($session_data);
				$this->db->set('image_link', $session_data['image_link']);
				$this->db->where('id', $session_data['id']);
				$this->db->update('user');
				
				list($width, $height) = getimagesize($source);
				$width_different = $this->width_constant - $width;
				$height_different =$this->height_constant - $height;
				
				if (($width_different) < 0 || ($height_different) < 0){
					$config_resize = array();
					$config_resize['image_library'] = 'gd2';
					$config_resize['source_image'] = $source;
					$config_resize['create_thumb'] = FALSE;
					$config_resize['maintain_ratio'] = TRUE;
					
					if($width_different < $height_different){
						$config_resize['width'] = $this->width_constant;
						$config_resize['height'] = $height - (int)($height/($width/$width_different));
					} else {
						$config_resize['height'] = $this->height_constant;
						$config_resize['width'] = $width - (int)($width/($height/$height_different));
					}

					$this->load->library('image_lib', $config_resize);
					$this->image_lib->resize();
					echo $this->image_lib->display_errors();
					
				}
				
			} else {
				echo "file upload failed";
			}
			
		} else {
		}

		$subdomain = array(
				"subdomain" => ""
		);
		
		if (file_exists($session_data['image_link'])){
			echo 'FILE EXIST';
			list($width, $height) = getimagesize($session_data['image_link']);
			$session_data["avatar_width"] = $width;
			$session_data["avatar_height"] = $height;
		} else {
			$session_data["avatar_width"] = 200;
			$session_data["avatar_height"] = 200;
		}
		//echo json_encode($session_data["logged"]);
		if(array_key_exists("logged", $session_data) && $session_data['logged']){
			$this->load->view('templates/main/header_top', $subdomain);
			$this->load->view('templates/user/header_middle', $subdomain);
			$this->load->view('templates/main/header_bottom', $subdomain);
			$this->load->view('templates/user/body', $session_data);
			$this->load->view('templates/main/footer', $subdomain);
		} else {
			echo "you must have get loggin!";
			$this->load->helper('url');
			redirect("", $subdomain);
		}

	}
	
	public function login(){

		$this->load->database();
		$this->load->library('session');
		
		$nickname = $_POST['login'];
		$password = $_POST['password'];
		$email = $_POST['login'];
		$response_info = array("result" => "");
		
		$sql = "SELECT * FROM user WHERE ( nickname = ? AND password = ? ) OR ( email = ? AND password = ? )"; 
		$query = $this->db->query( $sql, array($nickname, md5($password), $email, md5($password)) );
		
		if (sizeof($query->result()) > 0){
			$response_info["result"] = "success";
			$session_data = array(
					"id" => $query->result()[0]->id,
					"firstname" => $query->result()[0]->first_name,
					"lastname" => $query->result()[0]->last_name,
					"nickname" => $query->result()[0]->nickname,
					"email" => $query->result()[0]->email,
					"image_link" => $query->result()[0]->image_link,
					"logged" => true
			);
			$this->session->set_userdata($session_data);
		}
		
		echo json_encode($response_info);
		
	}
	
	public function closeSession(){
		$this->load->library('session');
		$this->session->sess_destroy();
		echo json_encode(array("result" => "success"));
	}
	
	public function index(){
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = '*';
		$this->load->library('upload', $config);
		if($this->upload->do_upload('file')){
			echo "success";
		}
	}
	
}