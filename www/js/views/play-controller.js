starterCtrls
  .controller('PlayController', ['$scope', '$state', '$stateParams', '$http', function ($scope, $state, $stateParams,$http) {
		console.log($stateParams.playId);
		$scope.pBack=function(){
			$state.go("detail", {detailId:$stateParams.playId});
		}
		$http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.item2 = res.data[$stateParams.playId];				
				}
			);
  	$scope.cardShow = function(){
  		$(".card").show();
  		$(".p_mask").show();
  		
  	}
  	$scope.cardClose = function(){
  		$(".card").hide();
  		$(".p_mask").hide();
  	}
  }]);
