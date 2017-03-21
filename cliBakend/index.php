<?php
/**
 * Created by PhpStorm.
 * User: Oshevchuk
 * Date: 21.03.2017
 * Time: 9:11
 */

$user=json_decode(file_get_contents('php://input'), true);

if(isset($user['name'])){
    echo json_encode($user).'olololo';
}else{
    echo 'wrong';
}