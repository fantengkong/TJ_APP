<?php
//状态码 4001 参数refresh_token获取失败
//状态码 4002 获取失败
//状态码 200  获取成功
error_reporting(7);
$appid = "wxc7d41ebf423a8ae0";  
$secret = "e96684a35b32e34dbd791824e88833de"; 
$data = array();
if($_GET['refresh_token']){
	$refresh_token = $_GET['refresh_token'];
	//第一步:取得openid
	
	$oauth2Url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=".$appid."&grant_type=refresh_token&refresh_token=".$refresh_token;
	$oauth2 = getJson($oauth2Url);	
	$result = json_decode($oauth2,true);
	
	if(isset($result["errcode"])){
		$data['status'] = 4002;
		$data['info'] = $result['errmsg'];		
	}else{
		$data['status'] = 200;
		$data['info'] = $oauth2;		
	} 	
}else{
	$data['status'] = 4001;
	$data['info'] = '未获取到code';
} 
echo json_encode($data,true);

function getJson($url){
    $ch = curl_init();
    //curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    $result = curl_exec($ch);
    curl_close($ch);
	return $result;
}