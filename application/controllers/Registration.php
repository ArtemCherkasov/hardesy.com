<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registration extends CI_Controller {

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
	
	public function view()
	{
		$subdomain = array(
				"subdomain" => ""
		);
		$this->load->view('templates/main/header_top', $subdomain);
		$this->load->view('templates/registration/header_middle', $subdomain);
		$this->load->view('templates/main/header_bottom', $subdomain);
		$this->load->view('templates/registration/body', $subdomain);
		$this->load->view('templates/main/footer', $subdomain);
	}
	
	public function userRegistrationData(){
		
		$ready_to_save = false;
		$this->load->database();
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$nickname = $_POST['nickname'];
		$birthday = $_POST['birthday'];
		$email = $_POST['email'];
		
		$response_info = array(
				"nickname" => '',
				"email" => ''				
		);
		
		$this->db->where('nickname', $nickname);
		$query = $this->db->get('user');
		
		if (sizeof($query->result()) > 0){
			$response_info["nickname"] = $query->result()[0]->nickname; 
		}
		
		$this->db->where('email', $email);
		$query = $this->db->get('user');
		
		if (sizeof($query->result()) > 0){
			$response_info["email"] = $query->result()[0]->email;
		}		
		
		if ($response_info["nickname"] == '' && $response_info["email"] == ''){
			$registration_info = array(
					"first_name" => $_POST['firstname'],
					"last_name" => $_POST['lastname'],
					"nickname" => $_POST['nickname'],
					"password" => md5($_POST['password']),
					"birthday" => $_POST['birthday'],
					"email" => $_POST['email'],
					"confirm_email" => md5($_POST['email'])
			);
			$this->db->insert('user', $registration_info);
		}		
		
		echo json_encode($response_info);
		
	}
}