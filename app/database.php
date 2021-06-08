<?php
class DBManager {

    private static $instance = null;
    private static $conn;

    private function __construct() {
        $cleardb_url = parse_url(getenv("mysql://b560e0773ab690:0f3d34db@eu-cdbr-west-01.cleardb.com/heroku_81de4425bb3a4cc?reconnect=true"));
        $cleardb_server = "eu-cdbr-west-01.cleardb.com";
        $cleardb_username = "b560e0773ab690";
        $cleardb_password = "0f3d34db";
        $cleardb_db = "heroku_81de4425bb3a4cc";
        $active_group = 'default';
        $query_builder = TRUE;

        self::$conn = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);
        if(self::$conn->connect_error) {
            // die("Failed to connect with MySQL: " . $conn -> connect_error);
        } else {
            // echo "E bine!<br>";
        }
    }
    public static function getInstance() {
        if(self::$instance == null) {
            self::$instance = new DBManager();
        }
        return self::$instance;
    }

    public static function getConnection() {
        return self::$conn;
    }

    private static function getArrayTypes($array) {
        $bindTypes = '';
        for($i = 0; $i < count($array); $i++) {
            $c = getType($array[$i])[0];
            if($c == 'b') {
                $array[$i] = (int) $array[$i];
                $c = 'i';
            }

            $bindTypes .= $c;
        }
        return $bindTypes;
    }

    public static function execSelect($query, $binds=[]) {
        $stmt = self::$conn->prepare($query);
        if(!empty($binds)) $stmt->bind_param(self::getArrayTypes($binds), ...$binds);
        if(!$stmt->execute()) return false;

        $data = $stmt->get_result();
        $rows = $data->fetch_all(MYSQLI_ASSOC);


        // for($i = 0; $i < count($rows); $i++) {
        //     echo implode(' - ', $rows[$i]) . '<br>';
        // }
        //
        // echo 'finished executing query<br>';

        return $rows;
    }

    public static function execInsert($query, $binds=[]) {
        $stmt = self::$conn->prepare($query);
        if($stmt == false) {
            // echo 'insert failed(prepare returns false)<br>' . $query;
            return false;
        }
        if(!empty($binds)) $stmt->bind_param(self::getArrayTypes($binds), ...$binds);

        if($stmt->execute()) {
            // echo 'insert successfull<br>';
            return true;
        } else {
            // echo 'insert failed<br>';
            return false;
        }
    }

    public function execUpdate($query, $binds=[]) {
        $stmt = self::$conn->prepare($query);
        if(!empty($binds)) $stmt->bind_param(self::getArrayTypes($binds), ...$binds);

        if($stmt->execute()) {
            // echo 'update successfull<br>';
            return true;
        } else {
            // echo 'update failed<br>';
            return false;
        }
    }

    public function execDelete($query, $binds=[]) {
        $stmt = self::$conn->prepare($query);
        if(!empty($binds)) $stmt->bind_param(self::getArrayTypes($binds), ...$binds);

        if($stmt->execute()) {
            // echo 'delete successfull<br>';
            return true;
        } else {
            // echo 'delete failed<br>';
            return false;
        }
    }

}

DBManager::getInstance();


//  $str = "SELECT * FROM information WHERE year = 2020 AND month = 5;";
//  $data = $conn->query($str);

//  $rows = $data->fetch_all(MYSQLI_ASSOC)[24];
//  echo "\n";
//  echo $rows['id'].' '.$rows['judet'].' '.$rows['total_someri'].' '.$rows['total_femei'].' '.$rows['total_barbati'].' '.$rows['indemnizati'].' '.$rows['neindemnizati'].' '.$rows['rata_somaj']
//             .' '.$rows['rata_somaj_femei'].' '.$rows['rata_somaj_barbati'].' '.$rows['total_urban'].' '.$rows['femei_urban'].' '.$rows['barbati_urban'].' '.$rows['total_rural'].' '.$rows['femei_rural'].' '.$rows['barbati_rural'].' '.$rows['fara_studii'].' '.$rows['invatamant_primar'].' '.$rows['invatamant_gimnazial'].' '.$rows['invatamant_liceal'].' '.$rows['invatamant_post'].' '.$rows['invatamant_profesional'].' '.$rows[
//             'invatamant_universitar'].' '.$rows['sub_25'].' '.$rows['25_29'].' '.$rows['30_39'].' '.$rows['40_49'].' '.$rows['50_55'].' '.$rows['peste_55'].' '.$rows['month'].' '.$rows['year'];
