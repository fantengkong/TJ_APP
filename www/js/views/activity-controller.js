starterCtrls
  .controller('ActivityController', function ($scope, $http) {
    $http.get('./mock/employee.json')
      .then(
        function (res) {
          $scope.employees = res.data;
        }
      );

    $scope.doRefresh = function () {
      $http.get('./mock/employee-more.json')
        .then(
          function (res) {
            $scope.employees = res.data.concat($scope.employees);
          }
        )
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        })
    };
  })
