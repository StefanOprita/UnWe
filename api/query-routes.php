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
    ]
];

function jsonFormat($resultArray, $categs)
{
    $toAdd = [];
    $toAdd['name'] = $resultArray[0]['judet'];
    $toAdd['id'] = Query::getIdCounty($resultArray[0]['judet']);
    $toAdd['total'] = $resultArray[0]['total_someri'];

    if (in_array('gender', $categs, false) || $categs == []) {
        $genders = [];
        $genders['male'] =  $resultArray[0]['total_barbati'];
        $genders['female'] =  $resultArray[0]['total_femei'];
        $toAdd['gender'] = $genders;
    }

    if (in_array('compensation', $categs, false) || $categs == []) {
        $comp = [];
        $comp['compensated'] =  $resultArray[0]['indemnizati'];
        $comp['non-compensated'] =  $resultArray[0]['neindemnizati'];
        $toAdd['compensation'] = $comp;
    }

    if (in_array('education', $categs, false) || $categs == []) {
        $educ = [];
        $educ['no education'] = $resultArray[0]['fara_studii'];
        $educ['primary'] = $resultArray[0]['invatamant_primar'];
        $educ['middleschool'] = $resultArray[0]['invatamant_gimnazial'];
        $educ['highschool'] = $resultArray[0]['invatamant_liceal'];
        $educ['post-highschool'] = $resultArray[0]['invatamant_post'];
        $educ['professional'] = $resultArray[0]['invatamant_profesional'];
        $educ['bachelors'] = $resultArray[0]['invatamant_universitar'];
        $toAdd['education'] = $educ;
    }

    if (in_array('rate', $categs, false) || $categs == []) {
        $rates = [];
        $rates['total'] = $resultArray[0]['rata_somaj'];
        $rates['male'] = $resultArray[0]['rata_somaj_barbati'];
        $rates['female'] = $resultArray[0]['rata_somaj_femei'];
        $toAdd['rate'] = $rates;
    }

    if (in_array('environment', $categs, false) || $categs == []) {
        $envir = [];
        $urb = [];
        $urb['total'] = $resultArray[0]['total_urban'];
        $urb['male'] = $resultArray[0]['barbati_urban'];
        $urb['female'] = $resultArray[0]['femei_urban'];

        $rur = [];
        $rur['total'] = $resultArray[0]['total_rural'];
        $rur['male'] = $resultArray[0]['barbati_rural'];
        $rur['female'] = $resultArray[0]['femei_rural'];

        $envir['urban'] = $urb;
        $envir['rural'] = $rur;
        $toAdd['environment'] = $envir;
    }


    if (in_array('age', $categs, false) || $categs == []) {
        $ages = [];
        $ages['<25'] = $resultArray[0]['sub_25'];
        $ages['25-29'] = $resultArray[0]['25_29'];
        $ages['30-39'] = $resultArray[0]['30_39'];
        $ages['40-49'] = $resultArray[0]['40_49'];
        $ages['50-55'] = $resultArray[0]['50_55'];
        $ages['>55'] = $resultArray[0]['peste_55'];
        $toAdd['age'] = $ages;
    }

    return $toAdd;
}

function jsonYearFormat($resultArray,$categs,$start,$finish){
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
        12 => 'december',
    ];
    $toAdd = [];
    for($i=$start;$i<=$finish;$i++){
        $month = [];
        $month[$months[$i]] = $months[$i];
        array_push($month, jsonFormat($resultArray[$i], $categs));
        array_push($toAdd,$month);
    }
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
    array_push($jsonFinal, jsonFormat($resultArray, $categs));

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
        array_push($jsonFinal, jsonFormat($resultArray, $categs));
    } else {
        $query->setStartYearAndMonth($wantedYear, 1);
        $query->setEndYearAndMonth($wantedYear, 12);
        $resultArray = $query->executeQuery();
        print_r(json_encode($query->executeQuery()));
        $jsonFinal = array();
        array_push($jsonFinal, jsonFormat($resultArray, $categs));
        // print_r(json_encode($jsonFinal));
    }
}
