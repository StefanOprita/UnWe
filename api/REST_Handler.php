<?php
    // $querries = array();
    //
    // echo print_r($querries);
    require_once '../app/database.php';
    require_once "./query-routes.php";
    require_once "./admin-routes.php";
    require_once "errorHandling.php";

    $allRoutes = [];

    array_push($allRoutes, ...$query_routes);
    array_push($allRoutes, ...$admin_routes);

    $allHeaders = getallheaders();


    $payloadString = file_get_contents("php://input");

    foreach ($allRoutes as $route) {
        $matchResult = verifyMatch($route, $_SERVER['REQUEST_URI']);
        if($matchResult == false) {
            continue;
        }

        $route["handler"](
            $matchResult["params"],
            $matchResult["queryParams"],
            $payloadString ? json_decode($payloadString, true) : NULL,
            $allHeaders
        );
        exit;
    }

    handle404("Endpoint doesn't exists. Check the API documentation!");



    function verifyMatch($route, $requestUri) {
        //luam intai uri fara query ca sa nu ne incurce query-ul
        $uriWithoutQuery = strtok($requestUri, '?');
        //impartim in tokenuri atat uri-ul dat cat si url-ul rutei
        $uriTokens = explode('/', filter_var(rtrim($uriWithoutQuery, '/'), FILTER_SANITIZE_URL));
        $routeUrlTokens = explode('/', filter_var(rtrim($route['url'], '/'), FILTER_SANITIZE_URL));

        //daca avem numar diferit de tokenuri, clar nu se potriveste

        if(count($uriTokens) != count($routeUrlTokens)) return false;

        //asta e regex-ul ca sa vedem daca e un parameru (incepe cu :)
        $paramRegex = "/:([a-zA-Z0-9]+)/";
        $matches = [];

        //ce o sa returnam
        $toReturn = [
            "params" => [],
            "queryParams" => []
        ];

        foreach ($routeUrlTokens as $index => $routeUrlToken) {
            $uriToken = $uriTokens[$index];

            //daca acesta este un parametru
            if(preg_match($paramRegex, $routeUrlToken, $matches) == 1) {
                //il stocam
                $toReturn["params"][$matches[1]] = $uriToken;
            } else {
                //daca nu e parametru, vedem daca conincid cele doua tokenuri
                if($uriToken !== $routeUrlToken) return false;
            }
        }

        //asa se scot query parameters
        parse_str($_SERVER['QUERY_STRING'], $toReturn["queryParams"]);

        return $toReturn;


        echo print_r($routeUrlTokens);
        echo "<br><br>";
        echo print_r($uriTokens);
        echo "<br><br>";
    }



?>
