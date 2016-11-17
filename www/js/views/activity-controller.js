starterCtrls
  .controller('ActivityController', ['$ionicViewSwitcher', '$scope', '$http', '$state', function ($ionicViewSwitcher, $scope, $http, $state) {
		
  }])
  .controller('lastestActCtrl', ['$ionicViewSwitcher', '$scope', '$http', '$state', function ($ionicViewSwitcher, $scope, $http, $state) {
 		/*活动页数据*/
    $scope.latestActivities = []; 
		/*获取数据*/
    $http.get('mock/activity.json')
		.then(
			function(res) {
				$scope.activities = res.data;
				$scope.activitiesLength = $scope.activities.length;
				for(var i=0;i<$scope.activitiesLength;i++){
					if($scope.activities[i].info != "已结束"){
						$scope.latestActivities.push($scope.activities[i]);							
					}
				}
			}
		);
		$scope.last_to_detail = function(index){
			$state.go("detail",{detailId:index, view:'tabs.activity.lastest'});
    	$ionicViewSwitcher.nextDirection("forward");
			
		}
 	}])
  .controller('pastActCtrl', ['$ionicViewSwitcher', '$scope', '$http', '$state', function ($ionicViewSwitcher, $scope, $http, $state) {
 		/*活动页数据*/
    $scope.pastActivities = [];
		/*获取数据*/
    $http.get('mock/activity.json')
		.then(
			function(res) {
				$scope.activities = res.data;
				$scope.activitiesLength = $scope.activities.length;
				for(var i=0;i<$scope.activitiesLength;i++){
					if($scope.activities[i].info == "已结束"){
						$scope.pastActivities.push($scope.activities[i]);
					}
				}
			}
		);
		
		$scope.past_to_detail = function(index){
			$state.go("detail",{detailId:index, view:'tabs.activity.past'});
    	$ionicViewSwitcher.nextDirection("forward");
			
		}
		
 	}])
  
