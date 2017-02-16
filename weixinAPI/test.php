<?php
include_once './WechatJssdk.class.php';

$test = new WechatJssdk();
echo json_encode($test->getSignPackage());
?>