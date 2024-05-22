<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json');

require_once('../../../../lib/inc/config.php');
require_once('../../redowsko_check_token/get.php');

function check_expired($token){
    global $conn;
    $sql="SELECT redowsko_token, profile_institution_code
        FROM user_profile
        WHERE 
        redowsko_token = ? 
        AND profile_record_status = 'A'
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        $url = SERVER_NAME.CHECK_INSTITUTION_LOCATION;
        $koders = "";
        
        while ($row = $result->fetch_assoc()) {
            $koders=$row['profile_institution_code']; 
        }

        $ch = curl_init($url);
        $data= json_encode([
            "koders" => $koders
        ]);
        $headers = array( "Content-Type: application/json" ,"accept: */*" );
        curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $result = curl_exec($ch);
        $response = json_decode($result, true);
        $lat = $response["latitude"];
        $long = $response["longitude"];

        return [
            "latitude" => $lat,
            "longitude" => $long
        ];

    }
    else{
        // 0  -> dikick. null -> diignore
        return [
            "latitude" => 0,
            "longitude" => 0
        ];
    }
}


if($_SERVER["REQUEST_METHOD"]=="POST") {
    $token = $_POST["token"];
    $expiredCheckResultSet = check_expired($token);

    $json = json_encode($expiredCheckResultSet);

    if ($json)
        echo $json;
    else
        echo json_encode(["err" => json_last_error_msg()]);
}


