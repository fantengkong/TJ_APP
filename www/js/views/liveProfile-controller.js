starterCtrls
  .controller('LiveProfileController',['$ionicViewSwitcher' ,'$scope','$state','$stateParams','$http', '$ionicHistory', '$ionicPopup', '$timeout', function ($ionicViewSwitcher, $scope, $state, $stateParams, $http, $ionicHistory, $ionicPopup, $timeout) {
		/*参数*/
		$scope.params = $stateParams;
		console.log($scope.params);
		/*直播预告*/
   	$scope.livePreview = true;
   	/*直播报名*/
   	$scope.enroll = true;
   	/*直播中*/
		$scope.living = false;
		/*关注探基公众号*/
		$scope.followTJ = true;
		/*直播结束*/
		$scope.liveEnd = false;
		$scope.liveFinish = false;
		/*直播结束可看回放*/
		$scope.playBack = false;
		/*报名看直播*/
		$scope.enterLive = false;
		$scope.baoming="报名看直播";
		/*跳转上一页*/
    $scope.liveprofile_back=function(){
    	console.log($stateParams.position)
    	$state.go($scope.params.view, {nav: $scope.params.nav, position: $scope.params.position});
    	$ionicViewSwitcher.nextDirection("back");
    	
    }
    /*判断是否是专家*/
   	if($scope.params.view=="tabs.home.watch"){
   		$scope.speaker = false;
   	}else{
   		$scope.speaker = true;
   	}
    
    /*直播专家信息显示*/
    $scope.cardShow = false;
    $scope.mesShow = function(){
    	$scope.cardShow = true;
    }
    $scope.mesHide = function(){
   		$scope.cardShow = false;
    }
    
		/*获取数据*/
		$http.get('./mock/home/home_list.json')
		.then(
			function(res) {
				if($scope.params.liveprofileId || $scope.params.liveprofileId == '0'){
					$scope.item = res.data[$stateParams.liveprofileId];
				}else if($scope.params.LiveId || $scope.params.liveId == '0'){
					$scope.item = res.data[$stateParams.liveId];
				}else{
					$scope.item = res.data[0];
				}
				if($scope.item.info == "直播预告"){
					$scope.livePreview = true;
				}else if($scope.item.info == "直播中"){
					$scope.enterLive = true;
					$scope.enroll = false;
					$scope.livePreview = false;
					$scope.living = true;
				}else if($scope.item.info == "直播结束"){
					$scope.enroll = false;
					$scope.livePreview = false;
					$scope.liveEnd = true;
					$scope.liveFinish = true;
					$scope.enterLive = false;
				}else if($scope.item.info == "直播回放"){
					$scope.enroll = false;
					$scope.livePreview = false;
					$scope.playBack = true;
					$scope.liveFinish = true;
					$scope.enterLive = false;
				}
			}
		);
		$scope.enterLive = false;
		if($scope.params.liveId || $scope.params.liveId==0){
			$scope.enterLive = true;
		}
		
		$scope.showAlert = function() {
			$scope.data = {}
	   	var myPopup = $ionicPopup.show({
	    	title: '<i class="icon iconfont">&#xe657;</i>',
	     	subTitle: '报名成功，开播会准时通知您哦',
	     	scope: $scope,
	     	buttons: []
	   	});
	   	myPopup.then(function(res) {
	   		$scope.enterLive = true;
	   	});
	   	$timeout(function() {
	      myPopup.close(); //由于某种原因2秒后关闭弹出
	   	}, 2000);
	   	$scope.livePreview = false;
	   	$scope.living = true;
	   	$scope.enterLive = true;
	 	};
	 	/*进入直播间*/
	 	$scope.gotoLive = function(){
    		$state.go('live',{liveId: $scope.params.liveprofileId, view2: 'liveprofile', view: $scope.params.view, nav: $scope.params.nav,position:$scope.params.position });
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
			$state.go("login_register",{view:'liveprofile'});
		}
		/*判断是否显示关注注公众号*/
		function GetQueryString(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		}
		if(GetQueryString("from")){
			$scope.followTJ = true;
		}else{
			$scope.followTJ = false;
		}
		
  }]);
