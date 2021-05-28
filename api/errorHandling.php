<?php
    function handle404($message) {
        http_response_code(404);
        $response = [
            "status" => 404,
            "message" => $message
        ];

        return json_encode($response);
    }

?>