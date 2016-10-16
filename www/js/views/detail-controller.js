starterCtrls
  .controller('DetailController', function ($scope, $state, $log) {
    $scope.dBack=function(){
    	$state.go("tabs.activity");
    }
  })
