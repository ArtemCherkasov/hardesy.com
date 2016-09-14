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
	
	public function view()
	{
		$subdomain = array(
				"subdomain" => ""
		);

		$this->load->database();
		$this->load->library('session');
		$session_data = $this->session->userdata();
		echo json_encode($session_data);
		/*
		$this->load->view('templates/main/header_top', $subdomain);
		//$this->load->view('templates/registration/header_middle', $subdomain);
		$this->load->view('templates/main/header_bottom', $subdomain);
		//$this->load->view('templates/registration/body', $subdomain);
		$this->load->view('templates/main/footer', $subdomain);
		*/
	}
	
	public function login(){

		$this->load->database();
		$this->load->library('session');
		
		$nickname = $_POST['login'];
		$password = $_POST['password'];
		$email = $_POST['login'];
		$response_info = array("result" => "");
		$session_data = array(
				"nickname" => "",
				"email" => "",
				"logged" => false
		);
		
		$sql = "SELECT * FROM user WHERE ( nickname = ? AND password = ? ) OR ( email = ? AND password = ? )"; 
		$query = $this->db->query( $sql, array($nickname, md5($password), $email, md5($password)) );
		
		if (sizeof($query->result()) > 0){
			$response_info["result"] = "success";
			$session_data = array(
					"nickname" => $nickname,
					"email" => $email,
					"logged" => true
			);
			$this->session->set_userdata($session_data);
		}
		
		echo json_encode($response_info);
		
	}
}