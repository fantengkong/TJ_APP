starterCtrls
  .controller('MyController', ['$scope', '$ionicTabsDelegate', '$http', function ($scope, $ionicTabsDelegate, $http) {
  	$scope.isFlag = true;		
  	if(sessionStorage.getItem("login")){
  		$(".k_nologin").attr("hidden","true");
  		$(".k_haslogin").removeAttr("hidden");
  	}else{
  		$(".k_haslogin").attr("hidden","true");
  		$(".k_nologin").removeAttr("hidden");
  	}
  	
  	$scope.myVedios = []; 	  
  	
  	$http.get('mock/my_list.json')
			.then(
				function(res) {
					$scope.myView = res.data;
					$scope.myViewLength = $scope.myView.length;
					for(var i=0;i<$scope.myViewLength;i++){
						if($scope.myView[i].info != "已结束"){
							$scope.myVedios.push($scope.myView[i]);	
						}
					}
					
					if($scope.myVedios.length == 0) {
						$(".myVedios").html("您还没有收藏视频哦!").css({
							color: "#b7b6b1",
							paddingTop: "20px",
							textAlign: "center"
						});
					}
				}
			);
  }])
  .controller('MyLookedController',['$scope', '$ionicTabsDelegate', '$http', function ($scope, $ionicTabsDelegate, $http) {
		
		$scope.myLookedVedios = []; 
		
  	$http.get('mock/my_list.json')
			.then(
				function(res) {
					$scope.myView = res.data;
					$scope.myViewLength = $scope.myView.length;
					for(var i=0;i<$scope.myViewLength;i++){
						if($scope.myView[i].info == "已结束"){
							$scope.myLookedVedios.push($scope.myView[i]);	
						}
					}
					
					if($scope.myLookedVedios.length == 0) {
						$(".myLooked").html("您还没有播放记录哦!").css({
							color: "#b7b6b1",
							paddingTop: "20px",
							textAlign: "center"
						});
					}
				}
			);
  }]);