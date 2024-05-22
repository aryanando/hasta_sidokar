<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json');
require_once('../../../lib/inc/config.php');

global $conn;

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $username = $_POST["user_name"];
    $password = $_POST["password"];

    $sql="SELECT profile_id, profile_fullname, 'profile_handphone' = profile_handphone1 + '/' + profile_handphone2, profile_group_id
        FROM user_profile,
        (SELECT COUNT(*) as ai_count FROM user_profile WHERE profile_type = 'AI') as mm
        WHERE md5(profile_email) = '".md5($username)."' AND profile_password = '".md5($password)."' AND profile_record_status = 'A' AND profile_type = 'AI'
        AND mm.ai_count <= 3
    ";

    $result = mysqli_query($conn,$sql);
    $is_success = mysqli_num_rows($result) > 0 ? true : false;
    $profile = $result->fetch_assoc();
    $role = explode(",", $profile["user_group_id"]);

    $json = [];

    if ($is_success)
    {
        $new_token = bin2hex(openssl_random_pseudo_bytes(18));

        $sql="
            UPDATE user_profile
            SET redowsko_token = '".$new_token."'
            WHERE md5(profile_email) = '".md5($username)."' AND profile_password = '".md5($password)."' AND profile_record_status = 'A'
        ";
        $result = mysqli_query($conn,$sql);

        $json = json_encode([
            "status" => "success",
            "token" => $new_token,
            "fullname" => $profile["profile_fullname"],
            "phone" => $profile["profile_handphone"],
            "role" => 5, //stand for hospital. gaperlu diganti. LAGI DIGANTI DULU JADI 6 BIAR TRIAL CHECK JALAN
            "user_id" => $profile["profile_id"]
        ]);
    }
    else{
        $json = json_encode([
            "status" => "error",
            "message" => "cannot find match account"
        ]);
    }

    if ($json)
        echo $json;
    else
        echo json_encode(["err" => json_last_error_msg()]);
}