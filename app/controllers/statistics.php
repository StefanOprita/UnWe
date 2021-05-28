<?php
class Statistics extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        $this->view('statistics/index.php', ['name' => $user->name]);
    }

}
