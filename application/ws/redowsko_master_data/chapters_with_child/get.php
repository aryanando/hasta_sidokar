<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json');

require_once('../../../../lib/inc/config.php');
require_once('../../redowsko_check_token/get.php');
require_once('../../chapter/includes/get.php');
require_once('../../standard/include/get.php');
require_once('../../ep/include/get.php');
require_once('../../telusur/includes/get.php');
require_once('../../version/get.php');
require_once('../../scenario/detail/get.php');
require_once('../../ep_extension/get.php');


if($_SERVER["REQUEST_METHOD"]=="POST") {
    $token = $_POST["token"];
    $chaptersResultSet = check_token($token, get_all_version);

    $json = json_encode($chaptersResultSet);

    if ($json != null)
        echo $json;
    else
        echo json_encode(["err" => json_last_error_msg()]);
}


