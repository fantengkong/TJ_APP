starterCtrls
  .controller('MyController', function ($scope, $ionicTabsDelegate, $log,$http) {
  	$scope.isFlag = true;		
  	if(sessionStorage.getItem("haslogin")){
  		$(".k_nologin").attr("hidden","true");
  		$(".k_haslogin").removeAttr("hidden");
  	}else{
  		$(".k_haslogin").attr("hidden","true");
  		$(".k_nologin").removeAttr("hidden");
  	}
  	$scope.items1={};
		$http.get('./mock/home_list.json')
			.then(
				function(res) {
					console.log(res.data)
					$scope.items1 = res.data;
				}
			);

  })
