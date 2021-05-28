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
        $conn = DBManager::getConnection();

        //inlocuim lista de judete cu ? ca sa putem face bind
        $selectString = str_replace("countyList", $countyList, $selectString);

        $params = array();

        array_push($params, $this->startYear);
        array_push($params, $this->startMonth);
        array_push($params, $this->endYear);
        array_push($params, $this->endMonth);
        array_push($params, ...$this->counties);

        $toReturn = [];

        $results = DBManager::execSelect($selectString, $params);

        // while($row = $result->fetch_array()) {
        foreach($results as $row) {
            $toAdd = [];
            foreach ($row as $key => $value) {
                $toAdd[$key] = $value;
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
        return 'N/A';
    }

    public static function getIdCounty($county) {
        global $countyNames, $countyIdToNames;
        $normalizedCounty = strtolower($county);

       return strtoupper(array_search($normalizedCounty,$countyIdToNames,false));
    }

}

?>
