starterCtrls
  .controller('DetailController',['$scope','$state','$stateParams','$http', '$ionicHistory',function ($scope, $state, $stateParams, $http, $ionicHistory) {
//  console.log($stateParams);
		/*跳转上一页*/
    $scope.dBack=function(){
    	if($stateParams.view){
    		$state.go("tabs.activity");
    	}else{
    		$state.go("tabs.home");
    	}
//  	$ionicHistory.goBack();
    } 
    /*跳转下一页*/
    $scope.detailGoTo = function(){
  		if($stateParams.info=="已结束"){
  			$state.go('play',{detailId: $stateParams.detailId, playId: $stateParams.detailId, view: 'detail'});
  		}else{
  			$state.go('live',{detailId: $stateParams.detailId, view: 'detail'});
  		}
    }
    $http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.item = res.data[$stateParams.detailId];
//					console.log($scope.item);
				}
			);
			
  }]);