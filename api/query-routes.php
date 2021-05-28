<?php
require_once "./Query/Query.php";
$query_routes = [
    [
        "method" => "GET",
        "url" => "/api/query/:county",
        "handler" => "queryDatabaseForCounty"
    ],
    [
        "method" => "GET",
        "url" => "/api/query/:county/:year",
        "handler" => "queryDatabase"
    ],
    [
        "method" => "GET",
        "url" => "/api/query/:county/:year/:month",
        "handler" => "queryDatabaseMonth"
    ]
];

function jsonFormat($resultArray, $categs)
{
    $toAdd = [];
    $toAdd['name'] = $resultArray['judet'];
    $toAdd['id'] = Query::getIdCounty($resultArray['judet']);
    $toAdd['total'] = $resultArray['total_someri'];

    if (in_array('gender', $categs, false) || $categs == []) {
        $genders = [];
        $genders['male'] =  $resultArray['total_barbati'];
        $genders['female'] =  $resultArray['total_femei'];
        $toAdd['gender'] = $genders;
    }

    if (in_array('compensation', $categs, false) || $categs == []) {
        $comp = [];
        $comp['compensated'] =  $resultArray['indemnizati'];
        $comp['non-compensated'] =  $resultArray['neindemnizati'];
        $toAdd['compensation'] = $comp;
    }

    if (in_array('education', $categs, false) || $categs == []) {
        $educ = [];
        $educ['no education'] = $resultArray['fara_studii'];
        $educ['primary'] = $resultArray['invatamant_primar'];
        $educ['middleschool'] = $resultArray['invatamant_gimnazial'];
        $educ['highschool'] = $resultArray['invatamant_liceal'];
        $educ['post-highschool'] = $resultArray['invatamant_post'];
        $educ['professional'] = $resultArray['invatamant_profesional'];
        $educ['bachelors'] = $resultArray['invatamant_universitar'];
        $toAdd['education'] = $educ;
    }

    if (in_array('rate', $categs, false) || $categs == []) {
        $rates = [];
        $rates['total'] = $resultArray['rata_somaj'];
        $rates['male'] = $resultArray['rata_somaj_barbati'];
        $rates['female'] = $resultArray['rata_somaj_femei'];
        $toAdd['rate'] = $rates;
    }

    if (in_array('environment', $categs, false) || $categs == []) {
        $envir = [];
        $urb = [];
        $urb['total'] = $resultArray['total_urban'];
        $urb['male'] = $resultArray['barbati_urban'];
        $urb['female'] = $resultArray['femei_urban'];

        $rur = [];
        $rur['total'] = $resultArray['total_rural'];
        $rur['male'] = $resultArray['barbati_rural'];
        $rur['female'] = $resultArray['femei_rural'];

        $envir['urban'] = $urb;
        $envir['rural'] = $rur;
        $toAdd['environment'] = $envir;
    }


    if (in_array('age', $categs, false) || $categs == []) {
        $ages = [];
        $ages['<25'] = $resultArray['sub_25'];
        $ages['25-29'] = $resultArray['25_29'];
        $ages['30-39'] = $resultArray['30_39'];
        $ages['40-49'] = $resultArray['40_49'];
        $ages['50-55'] = $resultArray['50_55'];
        $ages['>55'] = $resultArray['peste_55'];
        $toAdd['age'] = $ages;
    }

    return $toAdd;
}

function jsonYearFormat($resultArray, $categs, $start, $finish)
{
    $months = [
        1 => 'january',
        2 => 'february',
        3 => 'march',
        4 => 'april',
        5 => 'may',
        6 => 'june',
        7 => 'july',
        8 => 'august',
        9 => 'september',
        10 => 'october',
        11 => 'november',
        12 => 'december'
    ];
    $toAdd = [];
    $parity = -1;
    for ($i = $start; $i <= $finish; $i++) {
        $toAdd[$months[$i]] = jsonFormat($resultArray[$i - 1], $categs);
    }
    return $toAdd;
}

function queryDatabaseForCounty($params, $queryParams, $body, $headers)
{
    $countyName = Query::validateCounty($params["county"]);
    $month = date('m');
    $year1 = date('y') - 1;
    $year = '20' . $year1;
    // echo $year;
    // echo is_null($queryParams);
    if ($queryParams == [])
        $categs = [];
    else
        $categs = explode(" ", $queryParams['category']);


    if ($countyName == 'N/A') {
        echo handle404($params["county"] . " is not a valid county name / id!");
        exit;
    }

    $query = new Query();
    $query->addCounty($countyName);
    $query->setStartYearAndMonth($year, $month);
    $query->setEndYearAndMonth($year, $month);
    $resultArray = $query->executeQuery();


    $jsonFinal = array();
    array_push($jsonFinal, jsonFormat($resultArray[0], $categs));

    print_r(json_encode($jsonFinal));
}

function queryDatabase($params, $queryParams, $body, $headers)
{
    $countyName = Query::validateCounty($params["county"]);
    $wantedYear = $params["year"];
    // echo $wantedYear;
    if ($queryParams == [])
        $categs = [];
    else
        $categs = explode(" ", $queryParams['category']);

    if ($countyName == 'N/A') {
        echo handle404($params["county"] . " is not a valid county name / id!");
        exit;
    }

    $query = new Query();
    $query->addCounty($countyName);

    $jsonAll = [];
    if ($wantedYear == 2021) {
        $query->setStartYearAndMonth($wantedYear, 1);
        $query->setEndYearAndMonth($wantedYear, 2);
        $resultArray = $query->executeQuery();
        $jsonFinal = array();
        array_push($jsonFinal, jsonYearFormat($resultArray, $categs, 1, 2));
    } else {
        $query->setStartYearAndMonth($wantedYear, 1);
        $query->setEndYearAndMonth($wantedYear, 12);
        $resultArray = $query->executeQuery();
        // print_r(json_encode($resultArray[0]));
        $jsonFinal = array();
        array_push($jsonFinal, jsonYearFormat($resultArray, $categs, 1, 12));
    }

    print_r(json_encode($jsonFinal));
}

function queryDatabaseMonth($params, $queryParams, $body, $headers){

}