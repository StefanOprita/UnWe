<?php
class Api extends Controller {

    public function index($name) {
        $user = $this->model('User');
        $user->name = $name;

        $this->view('api/index.html', ['name' => $user->name]);
    }

    public function api($paramsOrSmth = []) {
        // TODO here we're gonna make the api
        // 'api' is gonna be the link e.g. website.com/public/statistics/api.php?... maybe
        // we can change it if needed
    }
}
