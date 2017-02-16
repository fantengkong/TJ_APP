<?php
//状态码 4001 参数refresh_token获取失败
//状态码 4002 access_token获取失败
//状态码 200  access_token获取成功
error_reporting(7);
$appid = "wxc7d41ebf423a8ae0";

$data = array();
if($_GET['refresh_token']){
		$refresh_token = $_GET['refresh_token']; 
		//第二步:根据全局access_token和openid查询用户信息
			
		$get_user_info_url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=".$appid."&grant_type=refresh_token&refresh_token=".$refresh_token;
		$infos = getJson($get_user_info_url);
		$result = json_decode($infos,true);
		if(isset($result["errcode"])){
			$data['status'] = 4002;
			$data['info'] = $result['errmsg'];			
		}else{
			$data['status'] = 200;
			$data['access_token'] = $result['access_token'];	
			$data['refresh_token'] = $result['refresh_token'];
		}	
}else{
	$data['status'] = 4001;
	$data['info'] = '未获取到参数refresh_token';
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