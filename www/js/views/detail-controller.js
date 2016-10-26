starterCtrls
  .controller('DetailController',['$scope','$state','$stateParams','$http', '$ionicHistory',function ($scope, $state, $stateParams, $http, $ionicHistory) {
    console.log($stateParams.view);
    $scope.dBack=function(){
    	
    	if($stateParams.view=="activity"){
    		$state.go("tabs.activity");
    	}else{
    		$state.go("tabs.home");
    	}
    	
//  	$ionicHistory.goBack();
    }   
    $http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.item = res.data[$stateParams.detailId];
					console.log($scope.item);
				}
			);
			
  }]);