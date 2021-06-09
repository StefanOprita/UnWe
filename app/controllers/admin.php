<?php
function tokenCheck() {

    // echo "cookie here";
    // echo $_COOKIE["token"];

    if(!isset($_COOKIE["token"])) {
        return false;
    }

 
   
    $token = $_COOKIE["token"];

    $sqlString = "SELECT * FROM authtokens WHERE token = ?";
    $results = DBManager::execSelect($sqlString, [$token]);
    if(count($results) == 0) return false;

    return true;
}
class Admin extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;
        if(tokenCheck()) {
            $this->view('admin/index.php', ['name' => $user->name, 'pageId' => 'admin']);
        } else {
            $this->view('admin/login.php', ['name' => $user->name, 'pageId' => 'admin']);
        }
    }

    public function login() {
        $user = $this->model('User');
        $this->view('admin/login.php', ['name' => $user->name, 'pageId' => 'admin']);
    }
}
