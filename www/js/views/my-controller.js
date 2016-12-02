starterCtrls
	.controller('MyController', ['$ionicPopup','ApiEndpoint','addinfo','$stateParams', '$ionicViewSwitcher', '$state', '$scope', '$ionicTabsDelegate', '$http', function($ionicPopup, ApiEndpoint, addinfo,$stateParams, $ionicViewSwitcher, $state, $scope, $ionicTabsDelegate, $http) {		
		if(localStorage.getItem("openid") ){
			$scope.login = true;
			$scope.speaker=JSON.parse(localStorage.getItem("userInfo"));
			console.log($scope.speaker);
			$http.post(ApiEndpoint.url+'/home/getPersonInfo',{userinfo:localStorage.getItem("userInfo")})
			.then(
				function(res){
					localStorage.setItem("uid",res.data.uid);
				}
			)
		}else{
			$scope.code =localStorage.getItem("code");
			$scope.login = false;
			if($scope.code){
				$.get('./weixinAPI/getAccessToken.php', {code: $scope.code}, function(data) {
					$scope.all = JSON.parse(data);
					console.log($scope.all);
					if($scope.all.subscribe){
						localStorage.setItem("openid",$scope.all.openid);
						$.get('./weixinAPI/getUserInfo.php',{access_token:$scope.all.access_token,openid:$scope.all.openid},function(res){
							console.log(res);
							$scope.arr2 = JSON.parse(JSON.parse(res).info );
							console.log(1111);
							localStorage.setItem("userInfo",JSON.stringify($scope.arr2));
							// location.reload();
						} )
					}else{
						$ionicPopup.alert({
							title: "提示",
							template: "请先关注微信号！",
							okText:"知道了"
						})
						.then(function(){	
							$state.go("login_register",{view:"tabs.my"});	
						})
					}					
				})
			}
		}
	}])
	.controller('MyVedioCtrl', ['ApiEndpoint', '$ionicViewSwitcher', '$state', '$scope', '$ionicTabsDelegate', '$http', function(ApiEndpoint, $ionicViewSwitcher, $state, $scope, $ionicTabsDelegate, $http) {
		$scope.myVedios = [];
		$scope.hasVedios = false;
		// $http.get('mock/my/my_video.json')
		// .then(
			// function(res) {
				// $scope.myVedios = res.data;
				// if($scope.myVedios.length == 0) {
					// $scope.hasVedios = false;
				// } else {
					// $scope.hasVedios = true;
				// }
			// }
		// );			
		$http.post(ApiEndpoint.url+'/home/getPersonProject',{uid:localStorage.getItem("uid"),page:1})
		.then(
			function(res){
				$scope.myVedios = res.data;
				if($scope.myVedios.length == 0) {
					$scope.hasVedios = false;
				} else {
					$scope.hasVedios = true;
				}
			}
		)			
		$scope.myVedio_to_play = function(index,type) {
			if(type==2){
				$state.go("liveprofile", {
					view: 'tabs.my.myVedio',
					id:index
				});
			}else{
				$state.go("play", {
					view: 'tabs.my.myVedio',
					id:index
				});
			}
			$ionicViewSwitcher.nextDirection("forward");
		}
	}])
	.controller('MyLookedCtrl', ['ApiEndpoint', '$ionicViewSwitcher', '$state', '$scope', '$ionicTabsDelegate', '$http', function(ApiEndpoint, $ionicViewSwitcher, $state, $scope, $ionicTabsDelegate, $http) {
		$scope.myLookedVedios = [];
		$scope.hasLooked = false;
		// $http.get('mock/my/my_looked.json')
		// .then(
			// function(res) {
				// $scope.myLookedVedios = res.data;
				// if($scope.myLookedVedios.length == 0) {
					// $scope.hasLooked = false;
				// } else {
					// $scope.hasLooked = true;
				// }
			// }
		// );	
		$http.post(ApiEndpoint.url+'/home/getPersonSkinRecord',{uid:localStorage.getItem("uid"),page:1})
		.then(
			function(res){
				$scope.myLookedVedios = res.data;
				console.log($scope.myLookedVedios)
				// if($scope.myLookedVedios.length == 0) {
					// $scope.hasLooked = false;
				// } else {
					// $scope.hasLooked = true;
				// }
			}
		);		
		$scope.looked_to_play = function(index,type) {
			if(type==2){
				$state.go("liveprofile", {
					view: 'tabs.my.myLooked',
					id:index
				});
			}else{
				$state.go("play", {
					view: 'tabs.my.myLooked',
					id:index
				});
			}		
			$ionicViewSwitcher.nextDirection("forward");
		};
	}]);