<?php
class Api extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        $this->view('api/index.php', ['name' => $user->name, 'pageId' => 'api']);
    }

    public function query($params = []) {
        print_r($params);
    }
}
