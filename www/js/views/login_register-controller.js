starterCtrls
  .controller('LoginRegisterController', ['$scope','$state','$timeout', function ($scope,$state,$timeout) {
    $scope.haslogin = function(){
    	sessionStorage.setItem("login", "false");
    	$state.go("tabs.my");
    	$scope.isFlag = false;
    }  
  }]);
