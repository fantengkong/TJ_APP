starterCtrls
  .controller('DetailController',['$scope','$state','$stateParams','$http', function ($scope, $state, $stateParams, $http) {
    $scope.dBack=function(){
    	$state.go("tabs.home");
    }   
    $http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.item = res.data[$stateParams.detailId];
					console.log($scope.item);
				}
			);
  }]);