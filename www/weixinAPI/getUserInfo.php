<?php
//状态码 4001 参数access_token openid获取失败
//状态码 4002 userinfo获取失败
//状态码 200  userinfo获取成功
error_reporting(7);

$data = array();
if($_GET['access_token'] && $_GET['openid']){
		$access_token = $_GET['access_token']; 
		$openid = $_GET['openid']; 
		//第二步:根据全局access_token和openid查询用户信息
		$get_user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN";
		$userinfo = getJson($get_user_info_url);
		$result = json_decode($userinfo,true);
		if(isset($result["errcode"])){
			$data['status'] = 4002;
			$data['info'] = $result['errmsg'];			
		}else{
			$data['status'] = 200;
			$data['info'] = $userinfo;				
		}	
}else{
	$data['status'] = 4001;
	$data['info'] = '未获取到参数access_token和openid';
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