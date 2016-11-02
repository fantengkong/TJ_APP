starterCtrls
  .controller('LiveProfileController',['$scope','$state','$stateParams','$http', '$ionicHistory',function ($scope, $state, $stateParams, $http, $ionicHistory) {
//  console.log($stateParams);
		/*跳转上一页*/
    $scope.dBack=function(){
    	
    } 
    /*跳转下一页*/
    $scope.detailGoTo = function(){
  		
    }
    $http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.item = res.data[0];
//					console.log($scope.item);
				}
			);
			
  }]);
