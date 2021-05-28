<?php

require_once  "queryCounties.php";

class Query {
    private $counties = [];
    private $startYear = 2019;
    private $startMonth = 1;

    private $endYear = 2019;
    private $endMonth = 1;

    //punem aici pe moment, din nou, nu am database managerul so...
    private static $columnNames = [];


    private $categoriesWanted = [];

    public function __construct() {

    }

    public function setStartYearAndMonth($year, $month) {
        $this->startYear = $year;
        $this->startMonth = $month;
    }

    public function setEndYearAndMonth($year, $month) {
        $this->endYear = $year;
        $this->endMonth = $month;
    }

    public function executeQuery() {
        $selectString =  file_get_contents('select.sql', FILE_USE_INCLUDE_PATH);

        $countyList = implode(',', array_fill(0, count($this->counties), '?'));

        $countyList = '(' . $countyList . ')';

        // //acuma ma conectez aici, dar o sa ne folosim de database manager sigur
        // $cleardb_url = parse_url(getenv("mysql://b560e0773ab690:0f3d34db@eu-cdbr-west-01.cleardb.com/heroku_81de4425bb3a4cc?reconnect=true"));
        // $cleardb_server = "eu-cdbr-west-01.cleardb.com";
        // $cleardb_username = "b560e0773ab690";
        // $cleardb_password = "0f3d34db";
        // $cleardb_db = "heroku_81de4425bb3a4cc";
        // $active_group = 'default';
        // $query_builder = TRUE;
        //
        // $conn = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);
        // if($conn->connect_error){
        //     die("Failed to connect with MySQL: " . $conn -> connect_error);
        // } else {
        // }
        // DELETE THIS ^^

        $conn = DBManager::getConnection();

        //inlocuim lista de judete cu ? ca sa putem face bind
        $selectString = str_replace("countyList", $countyList, $selectString);

        echo $selectString;
        // $stmt = $conn -> prepare($selectString);
        // $stmt -> bind_param('iiii', $this->startYear, $this->startMonth,
        //                             $this->endYear, $this->endMonth);
        //call_user_func_array(array($stmt,'bind_param'), $this->counties);
        // DELETE THIS ^^

        $params = array();

        array_push($params, $this->startYear);
        array_push($params, $this->startMonth);
        array_push($params, $this->endYear);
        array_push($params, $this->endMonth);
        array_push($params, ...$this->counties);

        // $refValues = $this->refValues($params);
        // print_r($refValues);
        // call_user_func_array(array($stmt,'bind_param'), $this->refValues($params));
        // $bindString = "iiii" . str_repeat('s', count($this->counties));
        // $stmt->bind_param($bindString, ...$params);
        // DELETE THIS ^^

        echo '<br>';
        // echo $bindString;
        // echo '<br>';
        // echo '<br>';
        // echo implode(' - ', $params);
        // echo '<br>';
        // echo '<br>';
        // echo '<br>';
        // DELETE THIS ^^


        // $stmt -> execute();
        // $result = $stmt -> get_result();
        // DELETE THIS ^^

        $toReturn = [];

        $results = DBManager::execSelect($selectString, $params);

        // while($row = $result->fetch_array()) {
        foreach($results as $row) {
            $toAdd = [];
            $parity = -1;
            foreach ($row as $key => $value) {
                $parity = ($parity + 1) % 2;
                if($parity == 0) continue;
                $toAdd[$key] = $value;
                // $columnName = Query::$columnNames[$key];
                // isset($toAdd[$columnName]);
                // $toAdd[$columnName] = $value;
            }
            array_push($toReturn, $toAdd);
        }

        return $toReturn;
    }


    public function addCounty($countyName) {
        $result = Query::validateCounty($countyName);
        if($result === false) return;
        array_push($this->counties, $result);
    }

    //functie ca sa verificam daca un judet exista
    //verifica daca exista ca nume sau ca prescurtare
    //Intoarce N/A daca nu e bun
    public static function validateCounty($county) {
        global $countyNames, $countyIdToNames;
        $normalizedCounty = strtolower($county);

        if(in_array($normalizedCounty, $countyNames, false)) return $normalizedCounty;

        if(isset($countyIdToNames[$normalizedCounty])) return $countyIdToNames[$normalizedCounty];
        //echo "what aici<br> " . $normalizedCounty . "<br>";
        return 'N/A';
    }

    public static function getIdCounty($county) {
        global $countyNames, $countyIdToNames;
        $normalizedCounty = strtolower($county);

       return strtoupper(array_search($normalizedCounty,$countyIdToNames,false));
    }

}

?>
