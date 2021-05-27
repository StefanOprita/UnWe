<?php
class Home extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        $this->view('home/index.html', ['name' => $user->name]);
    }
}
