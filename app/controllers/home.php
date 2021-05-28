<?php

class Home extends Controller {

    public function index() {
        $user = $this->model('User');
        //$user->name = $name;

        // $this->view('home/index.html', ['name' => $user->name]);

        echo 'test home<br><br><br>';

        // DBManager::execSelect('SELECT * FROM information');
        // DBManager::execSelect('DESCRIBE information');
        // DBManager::execInsert('INSERT INTO information(id) VALUES(?)', [3000]);

        // DBManager::execInsert('
        //     INSERT INTO information(judet, total_someri, total_femei, total_barbati, indemnizati, neindemnizati, rata_somaj, rata_somaj_femei, rata_somaj_barbati, total_urban, femei_urban, barbati_urban, total_rural, femei_rural, barbati_rural, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_post, invatamant_profesional, invatamant_universitar, sub_25, 25_29, 30_39, 40_49, 50_55, peste_55, month, year)
        //     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        //     ', ['TEST', 0, 0, 1, 2, 3, 4.1, 5.1, 6.1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
        // DBManager::execUpdate('UPDATE information SET id=? WHERE id=?', [4000, 3000]);
        // DBManager::execDelete('DELETE FROM information WHERE id>=3000');


    }
}
