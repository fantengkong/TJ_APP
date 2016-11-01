starterCtrls
  .controller('ActivityController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.pastActivities = [];
    $scope.latestActivities = []; 

    $http.get('mock/activity.json')
			.then(
				function(res) {
					$scope.activities = res.data;
					$scope.activitiesLength = $scope.activities.length;
					for(var i=0;i<$scope.activitiesLength;i++){
						if($scope.activities[i].info == "已结束"){
							$scope.pastActivities.push($scope.activities[i]);
						}else{
							$scope.latestActivities.push($scope.activities[i]);							
						}
					}
				}
			);
			
		/*$scope.latestGoTo = function(index){
			if($scope.latestActivities[index].info=="直播中"){
				$state.go("live");
			}else{
				$state.go("detail", {detailId: index,view: 'activity'});
			}
			$state.go("detail", {detailId: index,view: 'activity'});
		}
		
		$scope.pastGoTo = function(index){
			$state.go("detail", {detailId: index,view: 'activity'});
		}*/
		
  }]);
	/*$scope.doRefresh = function () {
    $http.get('./mock/employee-more.json')
      .then(
        function (res) {
          $scope.employees = res.data.concat($scope.employees);
        }
      )
      .finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
  };*/
