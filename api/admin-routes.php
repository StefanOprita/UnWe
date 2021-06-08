<?php

$admin_routes = [
    [
        'method' => 'POST',
        'url' => '/api/admin/create',
        'handler' => 'createAdmin'
    ],
    [
        'method' => 'POST',
        'url' => '/api/admin/login',
        'handler' => 'loginAdmin'
    ],
    [
        'method' => 'GET',
        'url' => '/api/admin/logged',
        'handler' => 'isLoggedOn'
    ],
    [
        'method' => 'DELETE',
        'url' => '/api/admin/:county/:year/:month',
        'handler' => 'removeEntry'
    ],
    [
        'method' => 'POST',
        'url' => '/api/admin/info',
        'handler' => 'addEntry'
    ]
];


function addEntry($params, $queryParams, $body, $headers) {
    //DBManager::execInsert($sqlString, [........])
    header("Content-Type: application/json");
    if(!tokenCheck()) {
        http_response_code(400);
        echo json_encode([
            'code' => 400,
            'message' => 'User not logged in!'
        ]);
        return;
    }
    //logica
    
    echo json_encode([
        'message' => 'Totu bine'
    ]);
}

function removeEntry($params, $queryParams, $body, $headers) {
    header("Content-Type: application/json");
    if(!tokenCheck()) {
        http_response_code(400);
        echo json_encode([
            'code' => 400,
            'message' => 'User not logged in!'
        ]);
        return;
    }
    $countyName = Query::validateCounty($params['county']);
    global $countyIdToNames;
    if(array_key_exists($countyName, $countyIdToNames)) {
        $countyName = $countyIdToNames[$countyName];
    }

    if($countyName === 'N/A') {
        http_response_code(400);
        echo json_encode([
            'code' => 400,
            'message' => $params['county'] . ' is not a valid county name!'
        ]);
        return;
    }

    $sqlString = 'DELETE FROM information WHERE year = ? AND month = ? AND (judet = ?)';

    
    DBManager::execDelete($sqlString, [$params['year'], $params['month'], $countyName]);
    http_response_code(200);
    echo json_encode([
        'code' => 200,
        'message' => 'Succesfully deleted '. $countyName . '!'
    ]);
}


function isLoggedOn($params, $queryParams, $body, $headers) {
    header("Content-Type: application/json");
    http_response_code(200);
    $check = tokenCheck();
    
    http_response_code(200);
    echo json_encode([
        "code" => 200,
        "message" => ($check)? 'Yes': 'No',
        "ok" => $check
    ]);
}

function loginAdmin($params, $queryParams, $body, $headers) {
    header("Content-Type: application/json");
    $username = $body["username"];
    $password = $body["password"];

    if(!adminExists($username)) {
        http_response_code(400);
        echo json_encode([ 
            "code" => 400,
            "message" => "This username is taken!"
        ]);
        return;   
    }


    $hashedPassword = getHashedPasswordOfAdmin($username);

    $match = password_verify($password, $hashedPassword);

    $responseMatch = ($match)? 'Login succesfull': 'Bad credentials!';
  

    $response = [
        "code" => 200,
        "message" => $responseMatch
    ];

    if($match) {
        $token = bin2hex(random_bytes(64));
        setcookie("token", $token, 0, "", "", false, true);
        saveAuthToken($token);
    }


    
    http_response_code(200);

    echo json_encode($response);
}

function createAdmin($params, $queryParams, $body, $headers) {
    header("Content-Type: application/json");
    $username = $body["username"];
    if(adminExists($username)) {
        http_response_code(400);
        echo json_encode([ 
            "code" => 400,
            "message" => "This username is taken!"
        ]);
        return;    
    }
    $password = $body["password"];
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    saveAdmin($username, $hash);

    $response = [
        "code" => 200,
        "message" => "New Administrator account created!"
    ];
    http_response_code(200);

    echo json_encode($response);
}


function fallBack($params, $queryParams, $body, $headers) {
    header("Content-Type: application/json");
    http_response_code(200);

    $raspuns = [
        "smth" => "magie",
        "mergi" => "pls"
    ];
    echo json_encode($raspuns);
}

//helper functions

function getHashedPasswordOfAdmin($username) {
    $sqlString = "SELECT password FROM administrators WHERE username = ?";
    $results = DBManager::execSelect($sqlString, [$username]);
    foreach ($results as $row) {
        foreach ($row as $key => $value) {
            if($key == "password") {
                return $value;
            }
        }
    }
}

function saveAuthToken($token) {
    $sqlString = "INSERT INTO authtokens VALUES(?)";
    DBManager::execInsert($sqlString, [$token]);
}

function saveAdmin($username, $hashedPassword) {
    $sqlString = "SELECT * FROM administrators";
    $results = DBManager::execSelect($sqlString, []);
    $idOfAdmin = count($results);
    $sqlString = "INSERT INTO administrators VALUES(?,?, ?, ?)";

    DBManager::execInsert($sqlString, [$idOfAdmin, $username, "a" , $hashedPassword]);
}


function adminExists($username) {
    $sqlString =  "SELECT * FROM administrators WHERE username = ?";
    $params = [$username];

    $results = DBManager::execSelect($sqlString, $params);
    //print_r($results);
    
    return !empty($results);
}

function tokenCheck() {
    if(!isset($_COOKIE["token"])) {
        return false;
    }

    $token = $_COOKIE["token"];

    $sqlString = "SELECT * FROM authtokens WHERE token LIKE ?";
    $results = DBManager::execSelect($sqlString, [$token]);
    if(count($results) == 0) return false;

    return true;
}

?>