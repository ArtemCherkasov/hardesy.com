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
		$this->load->view('templates/main/header_top');
		$this->load->view('templates/registration/header_middle', '<script></script>');
		$this->load->view('templates/main/header_bottom');
		$this->load->view('templates/registration/body');
		$this->load->view('templates/main/footer');
	}
	
	public function userRegistrationData(){
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$nickname = $_POST['nickname'];
		$birthday = $_POST['birthday'];
		$email = $_POST['email'];
		$registration_info = array(
				"firstname" => $_POST['firstname'],
				"lastname" => $_POST['lastname'],
				"nickname" => $_POST['nickname'],
				"birthday" => $_POST['birthday'],
				"email" => $_POST['email']
		);
		
		echo json_encode($registration_info);
	}
}