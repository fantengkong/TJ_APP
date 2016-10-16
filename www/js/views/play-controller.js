starterCtrls
  .controller('PlayController', function ($scope, $state) {

		$scope.pBack=function(){
			$state.go("detail");
		}
  	$scope.cardShow = function(){
  		$(".card").show();
  		$(".p_mask").show();
  		
  	}
  	$scope.cardClose = function(){
  		$(".card").hide();
  		$(".p_mask").hide();
  	}
  })
