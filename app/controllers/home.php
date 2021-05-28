<?php

class Home extends Controller {

    public function index($name='TestName') {
        $user = $this->model('User');
        $user->name = $name;

        // $this->view('home/index.html', ['name' => $user->name]);

        echo 'test home<br><br><br>';

        global $conn;

        // $str = "SELECT * FROM information WHERE year = 2020 AND month = 5;";
        $str = "SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'information';";

        $data = $conn->query($str);

        $rows = $data->fetch_all(MYSQLI_ASSOC);
        // echo implode('|', $rows);
        for($i = 0; $i < count($rows); $i++) {
            echo implode(' - ', $rows[$i]) . '<br>';
        }
        // echo "\n";
        // echo $rows['id'] . ' ' .
        //     $rows['judet'] . ' ' .
        //     $rows['total_someri'] . ' ' .
        //     $rows['total_femei'] . ' ' .
        //     $rows['total_barbati'] . ' ' .
        //     $rows['indemnizati'] . ' ' .
        //     $rows['neindemnizati'] . ' ' .
        //     $rows['rata_somaj'] . ' ' .
        //     $rows['rata_somaj_femei'] . ' ' .
        //     $rows['rata_somaj_barbati'] . ' ' .
        //     $rows['total_urban'] . ' ' .
        //     $rows['femei_urban'] . ' ' .
        //     $rows['barbati_urban'] . ' ' .
        //     $rows['total_rural'] . ' ' .
        //     $rows['femei_rural'] . ' ' .
        //     $rows['barbati_rural'] . ' ' .
        //     $rows['fara_studii'] . ' ' .
        //     $rows['invatamant_primar'] . ' ' .
        //     $rows['invatamant_gimnazial'] . ' ' .
        //     $rows['invatamant_liceal'] . ' ' .
        //     $rows['invatamant_post'] . ' ' .
        //     $rows['invatamant_profesional'] . ' ' .
        //     $rows['invatamant_universitar'] . ' ' .
        //     $rows['sub_25'] . ' ' .
        //     $rows['25_29'] . ' ' .
        //     $rows['30_39'] . ' ' .
        //     $rows['40_49'] . ' ' .
        //     $rows['50_55'] . ' ' .
        //     $rows['peste_55'] . ' ' .
        //     $rows['month'] . ' ' .
        //     $rows['year'];

    }
}
