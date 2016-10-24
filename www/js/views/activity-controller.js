starterCtrls
  .controller('ActivityController', ['$scope','$http', function ($scope, $http) {
    
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
