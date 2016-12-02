starterCtrls
  .controller('PlayController', ['$ionicLoading', 'ApiEndpoint', '$ionicViewSwitcher', '$scope', '$state', '$stateParams', '$http', function ($ionicLoading, ApiEndpoint,$ionicViewSwitcher, $scope, $state, $stateParams,$http) {
  	$ionicLoading.show({
	      template: '数据加载中...'
	  });
		console.log($stateParams);
		$scope.pBack=function(){
			if($stateParams.view2){
				$state.go($stateParams.view2,{position:$stateParams.position,nav:$stateParams.nav,view: $stateParams.view});
    		$ionicViewSwitcher.nextDirection("back");
			}else	if($stateParams.view){
				$state.go($stateParams.view, {position:$stateParams.position,nav:$stateParams.nav});
    		$ionicViewSwitcher.nextDirection("back");
			}else{
				$state.go("tabs.home.learn");
    		$ionicViewSwitcher.nextDirection("back");
			}
		}
		$scope.display = false;
		$scope.Video = true;
		//获取视频	
		$http.post(ApiEndpoint.url+'/home/getVideoInfo',{uid:localStorage.getItem("uid"),id:$stateParams.id})
		.then(
			function(res){
				console.log(res.data);
				$scope.playItems = res.data;	
				if($scope.playItems.type==0){
					$scope.display = true;
					$scope.Video = false;
				}else if($scope.playItems.type==1){
					$scope.display = false;
					$scope.Video = true;
				}
				if($scope.playItems.real_name){
					$scope.speaker=true;	
				}
				/*视频选集*/
				$scope.playList = res.data.videolist;
				
			}
		)
  	$scope.cardShow = function(){
  		$(".card").show();
  		$(".p_mask").show();
  		
  	}
  	$scope.cardClose = function(){
  		$(".card").hide();
  		$(".p_mask").hide();
  	}
  	/*显示更多*/
  	
  	$scope.showMore = function(){
  		if($scope.display == false){
  			$(".showMore i").css('transform','rotate(180deg)');
  			$scope.display = !$scope.display;
  		}else{
  			$(".showMore i").css('transform','rotate(360deg)');
  			$scope.display = !$scope.display;
  		}
  		
  		
  	}
  	
			
		$scope.selectItem = 0;
	
		$scope.selectPlay = function(index){
			
    	$scope.selectItem = index;
 			if($(".playAll").eq(index).find('i').first().hasClass('ng-hide')){
 				$scope.playSignShow = true;
	 			$(".playAll").eq(index).find('i').first().addClass('ng-show').removeClass('ng-hide');
	 			$(".playAll").eq(index).find('i').last().addClass('ng-hide').removeClass('ng-show');
	 		}else{
	 			$scope.playSignShow = false;
		 		$(".playAll").eq(index).find('i').first().addClass('ng-hide').removeClass('ng-show');
	 			$(".playAll").eq(index).find('i').last().addClass('ng-show').removeClass('ng-hide');		
	 		}
		}
		$scope.playSignShow = true;
		$scope.play = function(){
			$scope.playSignShow = false;
		}
		
  }])
  
  .controller('livePlayBackController', ['$ionicLoading', '$sce', 'ApiEndpoint', '$ionicViewSwitcher', '$scope', '$state', '$stateParams', '$http', function ($ionicLoading, $sce, ApiEndpoint, $ionicViewSwitcher, $scope, $state, $stateParams,$http) {
		$ionicLoading.show({
	      template: '数据加载中...'
	  });
		$scope.pBack=function(){
			if($stateParams.view2){
				$state.go($stateParams.view2,{position:$stateParams.position,nav:$stateParams.nav,view: $stateParams.view});
    		$ionicViewSwitcher.nextDirection("back");
			}else	if($stateParams.view){
				$state.go($stateParams.view, {position:$stateParams.position,nav:$stateParams.nav});
    		$ionicViewSwitcher.nextDirection("back");
			}else{
				$state.go("tabs.home.learn");
    		$ionicViewSwitcher.nextDirection("back");
			}
		}
		$scope.display = false;
		$scope.Video = true;
		//获取视频/* localStorage.getItem("uid") $stateParams.id*/
		$http.post(ApiEndpoint.url+'/home/getRadioInfo',{uid:27,id:102})
		.then(
			function(res){
				$scope.live_back = res.data;	
				console.log($scope.live_back);
				if($scope.live_back.fcate){
					$scope.display = false;
					$scope.Video = true;
					$scope.speaker = true;
				}else{
					$scope.display = true;
					$scope.Video = false;
					$scope.speaker = false;
				}
				/*视频选集*/
				$scope.targetUrl = $sce.trustAsResourceUrl($scope.live_back.visit_url);
				$ionicLoading.hide();
			}
		)

  	$scope.cardShow = function(){
  		$(".card").show();
  		$(".p_mask").show();
  		
  	}
  	$scope.cardClose = function(){
  		$(".card").hide();
  		$(".p_mask").hide();
  	}
  	/*显示更多*/
  	$scope.showMore = function(){
  		if($scope.display == false){
  			$(".showMore i").css('transform','rotate(180deg)');
  			$scope.display = !$scope.display;
  		}else{
  			$(".showMore i").css('transform','rotate(360deg)');
  			$scope.display = !$scope.display;
  		}  		
  	}
		$scope.playSignShow = true;
		$scope.play = function(){
			$scope.playSignShow = false;
			$scope.webIframe = true;
		}
  }]);
