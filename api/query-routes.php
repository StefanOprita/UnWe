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

    function queryDatabaseForCounty($params, $queryParams, $body, $headers) {
        $countyName = Query::validateCounty($params["county"]);

 
     
        if($countyName == 'N/A') {
            echo handle404($params["county"] . " is not a valid county name / id!");
            exit;
        }

        $query = new Query();
        
        $query -> addCounty($countyName);
        print_r($query -> executeQuery());
    }


?>