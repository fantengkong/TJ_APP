starterCtrls
  .controller('MyController', ['$scope', '$ionicTabsDelegate', '$http', function ($scope, $ionicTabsDelegate, $log,$http) {
  	$scope.isFlag = true;		
  	if(sessionStorage.getItem("login")){
  		$(".k_nologin").attr("hidden","true");
  		$(".k_haslogin").removeAttr("hidden");
  	}else{
  		$(".k_haslogin").attr("hidden","true");
  		$(".k_nologin").removeAttr("hidden");
  	}
		$scope.items1 = {};
		$http.get('./mock/my_list1.json')
			.then(
				function(res) {
					$scope.items1 = res.data;
					if($scope.items1.length == 0) {
						$(".myVedio").html("您还没有收藏视频哦!").css({
							color: "#b7b6b1",
							paddingTop: "20px",
							textAlign: "center"
						});
					}
				}
			);
		
  }])
  .controller('MyLookedController',['$scope', '$ionicTabsDelegate', '$http', function ($scope, $ionicTabsDelegate, $http) {
  	$scope.items2 = {};
  	$http.get('./mock/my_list2.json')
			.then(
				function(res) {				
					$scope.items2 = res.data;
					if($scope.items2.length==0){
						$(".myLooked").html("您还没有播放记录哦!").css({
							color: "#b7b6b1",
							paddingTop: "20px",
							textAlign: "center"
						});
					}
				}
			);
  }]);