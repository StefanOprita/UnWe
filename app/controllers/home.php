<?php

class Home extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        // $this->view('home/index.html', ['name' => $user->name]);

        echo 'test home<br><br><br>';

        // DBManager::execSelect('SELECT * FROM information;');


    }
}
