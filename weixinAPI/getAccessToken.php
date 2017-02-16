<?php
//状态码 4001 基础token获取失败
//状态码 4002 code参数发送失败
//状态码 4003 openid获取失败
//状态码 4004 subscribe获取失败
//状态码 200  获取成功

error_reporting(7);
$appid = "wxc7d41ebf423a8ae0";  
$secret = "e96684a35b32e34dbd791824e88833de";  
$data = array();

	////////////////////////第一步:取得基础token
	$oauth2Url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$secret;
	$oauth2 = getJson($oauth2Url);	
	$result = json_decode($oauth2,true);
	
	if(isset($result["errcode"])){
		$data['status'] = 4001;
		$data['info'] = $result['errmsg'];		
	}else{
		$oauth2 = json_decode($oauth2,true);
		$data['base_token'] = $oauth2['access_token'];
		/////////////////////第二步:取得access_token和openid
		if($_GET['code']){
			$code = $_GET['code'];
			$openidUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code";
			$openidJson = getJson($openidUrl);	
			$openidArr = json_decode($openidJson,true);
			
			if(isset($openidArr["errcode"])){
				$data['status'] = 4003;
				$data['info'] = $openidArr['errmsg'];		
			}else{
				/////////////////////////////////第三步
				$data['access_token'] = $openidArr['access_token']; 
				$data['openid'] = $openidArr['openid']; 
				$data['refresh_token'] = $openidArr['refresh_token']; 
				//第二步:根据全局access_token和openid查询用户信息
				$get_user_info_url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=".$data['base_token']."&openid=".$data['openid'];
					
				$ifFocusJson = getJson($get_user_info_url);
				$ifFocusArr = json_decode($ifFocusJson,true);
				if(isset($ifFocusArr["errcode"])){
					$data['status'] = 4004;
					$data['info'] = $ifFocusArr['errmsg'];			
				}else{
					$data['status'] = 200;
					$data['info'] = '获取成功';
					$data['subscribe'] = $ifFocusArr['subscribe'];				
				}					
			} 	
		}else{
			$data['status'] = 4002;
			$data['info'] = '未获取到code';
		} 		
	} 	

echo json_encode($data,true);
/*
返回参数说明
$data = array(
	'status',			状态码
	'info',			    获取信息
	'base_token',       基础token
	'access_token', 
	'openid',
	'subscribe',
)
*/

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