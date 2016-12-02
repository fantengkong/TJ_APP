starterCtrls
  .controller('DetailController',['dateService','$ionicLoading','ApiEndpoint', '$ionicViewSwitcher', '$scope','$state','$stateParams','$http', '$ionicHistory',function (dateService, $ionicLoading,ApiEndpoint, $ionicViewSwitcher ,$scope, $state, $stateParams, $http, $ionicHistory) {
    /*底部栏状态*/
    $scope.attend = false;
    $scope.close = false;
    $scope.begin_soon = false;
    $ionicLoading.show({
	      template: '数据加载中...'
	  });
		/*跳转上一页*/
    $scope.dBack=function(){
    	if($stateParams.view){
    		$state.go($stateParams.view);
    		$ionicViewSwitcher.nextDirection("back");
    	}else{
    		$state.go("tabs.home");
    		$ionicViewSwitcher.nextDirection("back");
    	}
    } 
    
    /*跳转到直播间*/
    $scope.goToLive = function(index){
  		if($stateParams.view == "tabs.activity.lastest"){
  			$state.go('liveprofile',{view: $stateParams.view, view3: 'detail',id:index});
  		}
    }
//  var date = "2015-8-31 12:10";
//  var arr=date.match(/.*,(.*)/)[1].split("-");
//		var end=new Date(arr[0],parseInt(arr[1])-1,arr[2]);
//		console.log(end)//true 时间可直接比较
//  var time = toString(2015-10-12 15:34:55);
//  console.log(dateService.handleMessageDate(time) );
		$http.post(ApiEndpoint.url+'/home/getActivityInfo',{id:$stateParams.id,uid:''})
			.then(
				function(res) {
					
					$scope.item = res.data;
					$scope.item.logo = ApiEndpoint.url + $scope.item.logo;
					if($scope.item.timestr=="已结束"){
						$scope.attend = false;
				    $scope.close = true;
				    $scope.begin_soon = false;
					}else if($scope.item.timestr=="进行中"){
						$scope.attend = true;
				    $scope.close = false;
				    $scope.begin_soon = false;
					}else{
						$scope.attend = false;
						$scope.close = true;
						$scope.begin_soon = true;
					}
					if($scope.item.jointype==0){
						$scope.attend = false;
				    $scope.close = false;
				    $scope.begin_soon = false;
					}else if($scope.item.jointype==1){
						$scope.attend = false;
				    $scope.close = false;
				    $scope.begin_soon = false;
					}
					$ionicLoading.hide();
				}
			);
			
			
			
			
			
  }]);