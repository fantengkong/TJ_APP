starterCtrls
  .controller('PlayController', ['$scope', '$state', '$stateParams', '$http', function ($scope, $state, $stateParams,$http) {
		console.log($stateParams);
		$scope.pBack=function(){
			if($stateParams.playId>=0&&$stateParams.view){
				$state.go($stateParams.view, {detailId:$stateParams.detailId});
			}else if($stateParams.detailId>=0){
				$state.go("detail", {detailId:$stateParams.detailId});
			}else{
				$state.go("tabs.home.watch");
			}
			
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
  	/*显示更多*/
  	$scope.display = false;
  	$(".showMore i").css('transform','rotate(180deg)');
  	$scope.showMore = function(){
  		if($scope.display != false){
  			$(".showMore i").css('transform','rotate(180deg)');
  			$scope.display = !$scope.display;
  		}else{
  			$(".showMore i").css('transform','rotate(360deg)');
  			$scope.display = !$scope.display;
  		}
  		
  		
  	}
  	/*视频选集*/
	  	/*获取假数据*/
			$http.get('mock/play_list.json')
			.then(
				function(res) {
					$scope.playList = res.data;
					$scope.playListNum = $scope.playList.length;
				}
			);	
			
		$scope.selectItem = 0;
	
		$scope.selectPlay = function(index){
    	$scope.selectItem = index;
 			if($(".playAll").eq(index).find('i').first().hasClass('ng-hide')){
	 			$(".playAll").eq(index).find('i').first().addClass('ng-show').removeClass('ng-hide');
	 			$(".playAll").eq(index).find('i').last().addClass('ng-hide').removeClass('ng-show');
	 		}else{
		 		$(".playAll").eq(index).find('i').first().addClass('ng-hide').removeClass('ng-show');
	 			$(".playAll").eq(index).find('i').last().addClass('ng-show').removeClass('ng-hide');		
	 		}
		}
		
			
			
			
  }]);
