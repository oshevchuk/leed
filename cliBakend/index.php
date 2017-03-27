<?php
/**
 * Created by PhpStorm.
 * User: Oshevchuk
 * Date: 21.03.2017
 * Time: 9:11
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$user=json_decode(file_get_contents('php://input'), true);

if(isset($user['name'])){
//    echo json_encode($user).'olololo';
}else{
//    echo 'wrong';
}

if(isset($_POST)){
//    echo $_POST["suggest"].'::';
//    print_r($_POST["suggest"]);
//    print_r($user);
//    $data=json_decode(json_encode($_POST["suggest"]), true);
    $data=json_decode($_POST["suggest"]);
    print_r($data);
    foreach ($data as $key => $value) {
        echo $key.':::'.$value.'..<br>';
    }
//
//    echo $data->email;
}