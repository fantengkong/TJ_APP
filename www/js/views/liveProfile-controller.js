starterCtrls
  .controller('LiveProfileController',['$ionicLoading','ApiEndpoint', 'addinfo','$ionicViewSwitcher' ,'$scope','$state','$stateParams','$http', '$ionicHistory', '$ionicPopup', '$timeout', function ($ionicLoading,ApiEndpoint, addinfo, $ionicViewSwitcher, $scope, $state, $stateParams, $http, $ionicHistory, $ionicPopup, $timeout) {
  	$ionicLoading.show({
	      template: '数据加载中...'
	  });
  	
	/*直播预告*/
 	$scope.livePreview = false;
 	/*直播报名*/
 	$scope.enroll = false;
 	/*直播状态*/
	$scope.live_state = false;
	/*关注探基公众号*/
	$scope.followTJ = true;
	/*直播结束*/
	$scope.liveEnd = false;
	$scope.liveFinish = false;
	/*直播结束可看回放*/
	$scope.playBack = false;
	/*进入直播间*/
	$scope.enterLive = false;
	$scope.baoming="报名看直播";
	/*跳转上一页*/
    $scope.liveprofile_back=function(){
    	if($stateParams.view3){
    		$state.go($stateParams.view3, {view: $stateParams.view,nav: $stateParams.nav, position: $stateParams.position,id:$stateParams.id});
    	}else{
    		$state.go($stateParams.view, {nav: $stateParams.nav, position: $stateParams.position});
    	}
    	$ionicViewSwitcher.nextDirection("back");
    }
    
    /*直播专家信息显示*/
    $scope.cardShow = false;
    $scope.mesShow = function(){
    	$scope.cardShow = true;
    }
    $scope.mesHide = function(){
   		$scope.cardShow = false;
    }
    var myDate=new Date();
    var time_sec = Math.floor(myDate/1000);
    console.log(time_sec);
    
    $scope.countDown;
		/*获取数据*/
		$scope.liveMess;
		$http.post(ApiEndpoint.url+'/home/getRadioInfo',{uid:32,id:$stateParams.id})
		.then(
			function(res) {
				$scope.liveMess = res.data;
				console.log($scope.liveMess);
				/*判断是否是专家*/
		   	if($scope.liveMess.fate==2){
		   		$scope.speaker = false;
		   	}else{
		   		$scope.speaker = true;
		   	}
				var _time=Number($scope.liveMess.open_time)+3600-Number(time_sec);
				if(_time>0){
					$scope.countDown=addinfo.formatSeconds(_time);
				}
				if(time_sec<Number($scope.liveMess.open_time)+60){
					$scope.livePreview = true;
				}else if(time_sec>Number($scope.liveMess.open_time)+60&&time_sec<$scope.liveMess.close_time){
					/*直播中*/
					$scope.live_state = true;
					$scope.liveState = "直播中";
				}else if(time_sec>Number($scope.liveMess.close_time)+60){
					/*直播中*/
					$scope.live_state = true;
					$scope.liveState = "直播结束";
				}
				if($scope.liveMess.if_signup == 1&&$scope.liveMess.cate==1){
					if($scope.liveMess.type==2&&time_sec<$scope.liveMess.close_time){
				   	/*进入直播间*/
						$scope.enterLive = true;
					}else if($scope.liveMess.type==3||time_sec>$scope.liveMess.close_time){
						$scope.liveFinish = true;
					}else if($scope.liveMess.type==4){
						/*直播结束*/
						$scope.liveFinish = true;
					}else if($scope.liveMess.type==5){
						/*直播结束*/
						$scope.playBack = true;
						$scope.liveFinish = true;
					}else if($scope.liveMess.type==6){
						/*直播结束*/
						$scope.liveFinish = true;
						$scope.live_state = true;
						$scope.liveState = "已下映";
					}
				}else{
					if($scope.liveMess.type==1||$scope.liveMess.type==2){
				   	$scope.enroll = true;
					}else if($scope.liveMess.type==3){
						$scope.liveFinish = true;
					}
				}
				$ionicLoading.hide();
			}
		);
		$scope.showNum=true;
		$scope.registeredPersonnels;
		$scope.num;
		if(localStorage.getItem("uid")){
			$http.post(ApiEndpoint.url+'/home/getSignups',{uid:1,id:$stateParams.id})
			.then(
				function(res) {
					$scope.registeredPersonnels=res.data.userList;
					$scope.num=res.data.signNum;
					if(res.data.signNum<=4){
						$scope.showNum=false;
					}else if(res.data.signNum>7){
						$scope.registeredPersonnels=$scope.registeredPersonnels.slice(0,7);
					}
				}
			);
		}else{
			$scope.showNum=false;
		}
		$scope.showAlert = function() {
			if(!localStorage.getItem("uid")||$scope.liveMess.if_signup==1){
				$scope.data = {}
		   	var myPopup = $ionicPopup.show({
		    	title: '<i class="icon iconfont">&#xe657;</i>',
		     	subTitle: '报名成功，开播会准时通知您哦',
		     	scope: $scope,
		     	buttons: []
		   	});
		   	myPopup.then(function(res) {
		   		 	$http.post(ApiEndpoint.url+'/home/radioSignup',{uid:20,id:$stateParams.id}).then(function(res){
		   		 		console.log(res);
		   		 	})
		   			$scope.enterLive = true;
		   	});
		   	$timeout(function() {
		      myPopup.close(); //由于某种原因2秒后关闭弹出
		   	}, 2000);
		   	$scope.livePreview = false;
		   	$scope.living = true;
		   	$scope.enterLive = true;
			}else{
				alert("进入直播间前请先登录");
				$state.go("tabs.my");
			}
	 	};
	 	/*进入直播间*/
	 	$scope.gotoLive = function(){
			console.log($stateParams);
			if($stateParams.view3){
				$state.go('live',{view3:$stateParams.view3,view2: 'liveprofile', view: $stateParams.view, nav: $stateParams.nav,position:$stateParams.position,id:$stateParams.id});
			}else{
				$state.go('live',{view2: 'liveprofile', view: $stateParams.view, nav: $stateParams.nav,position:$stateParams.position,id:$stateParams.id});
			}
    		
	 	}
		/*关闭直播中*/
		$scope.closeLiving = function(){
			$scope.living = false;
			$scope.liveEnd = true; 
			$scope.enterLive = false;
			$scope.liveFinish = true;
		}
		/*打开回放*/
		$scope.livePlayBack = function(){
			$scope.liveEnd = false;
			$scope.playBack = true; 
		}
		$scope.goHome = function(){
			$state.go("tabs.home.watch");
		}
		$scope.goToTJweixin = function(){
			$state.go("tabs.my",{view:'liveprofile'});
		}
		/*判断是否显示关注注公众号*/
		if(localStorage.getItem("userwx")){
			$scope.followTJ = true;
		}else{
			$scope.followTJ = false;
		}
  }]);
