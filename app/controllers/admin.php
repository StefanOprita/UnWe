<?php

class Admin extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        $this->view('admin/index.php', ['name' => $user->name, 'pageId' => 'admin']);


    }
}
