starterCtrls
.controller('ActivityController', ['$ionicViewSwitcher', '$scope', '$http', '$state', function ($ionicViewSwitcher, $scope, $http, $state) {}])
.controller('lastestActCtrl', ['ApiEndpoint', '$ionicLoading','$timeout','ApiEndpoint','$ionicViewSwitcher', '$scope', '$http', '$state', function (ApiEndpoint, $ionicLoading,$timeout, ApiEndpoint, $ionicViewSwitcher, $scope, $http, $state) {
	$scope.page = 1; 		
 	/*活动页数据*/
    $scope.latestActivities = []; 
	/*获取数据*/
    $http.post(ApiEndpoint.url+'/home/getActivities',{type:1,page:1})
	.then(
		function(res) {
			console.log(res);
			$scope.latestActivities = res.data;
			angular.forEach($scope.latestActivities, function(data){
				data.logo=ApiEndpoint.url+data.logo;
			});
			if(!$scope.latestActivities){
				$scope.activity_lastest = false;
			}else{
				$timeout(function(){
					$scope.activity_past = true;
				},2000)
			}
			$ionicLoading.hide();
		}
	);
	$ionicLoading.show({
      template: '数据加载中...'
  });
	$scope.last_to_detail = function(index){
		$state.go("detail",{view:'tabs.activity.lastest',id:index});
		$ionicViewSwitcher.nextDirection("forward");
	};
	/*上拉加载更多*/		
	/*是否加载*/		
	$scope.load_morelastest = function() {
		if(!$("ion-infinite-scroll i").html()) {
			$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
		}
		$scope.page++;
		$http.post(ApiEndpoint.url+'/home/getActivities',{type:1,page:$scope.page})
		.then(function(items){
			$scope.res=items.data;
			angular.forEach($scope.res, function(data){
				data.logo=ApiEndpoint.url+data.logo;
			});
			if($scope.res){
				$scope.latestActivities = $scope.latestActivities.concat($scope.res);
			}else{
				$scope.activity_lastest = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	};
	$scope.$on('scroll.infiniteScrollComplete', function() {
		// $scope.load_morelastest();
	});
}])
  .controller('pastActCtrl', ['ApiEndpoint' ,'$ionicLoading','$timeout','ApiEndpoint','$ionicViewSwitcher', '$scope', '$http', '$state', function (ApiEndpoint, $ionicLoading,$timeout, ApiEndpoint, $ionicViewSwitcher, $scope, $http, $state) {
 	$ionicLoading.show({
      template: '数据加载中...'
  });
 	$scope.page = 1;
 	/*活动页数据*/
    $scope.pastActivities = [];
	/*获取数据*/
	$http.post(ApiEndpoint.url+'/home/getActivities',{type:2,page:1})
	.then(
		function(res) {
			$scope.pastActivities = res.data;
			angular.forEach($scope.pastActivities, function(data){
				data.logo=ApiEndpoint.url+data.logo;
			});
			if(!$scope.pastActivities){
				$scope.activity_past = false;
			}else{
				$timeout(function(){
					$scope.activity_past = true;
				},2000)	
			}
			$ionicLoading.hide();
		}
	);
	$scope.past_to_detail = function(index){
		$state.go("detail",{view:'tabs.activity.past',id:index});
		$ionicViewSwitcher.nextDirection("forward");	
	}
	/*上拉加载更多*/
	$scope.load_morepast = function() {
		if(!$("ion-infinite-scroll i").html()) {
			$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
		}
		$scope.page++;
		$http.post(ApiEndpoint.url+'/home/getActivities',{type:2,page:$scope.page})
		.then(function(items){
			$scope.res= items.data;
			angular.forEach($scope.res, function(data){
				data.logo=ApiEndpoint.url+data.logo;
			});
			if($scope.res){
				$scope.pastActivities = $scope.pastActivities.concat($scope.res);
			}else{
				$scope.activity_past = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	};
	$scope.$on('scroll.infiniteScrollComplete', function() {
		// $scope.loadMore();
	});
 }])
  
