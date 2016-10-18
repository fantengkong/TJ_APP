starterCtrls
  .controller('LoginRegisterController', function ($scope,$state,$timeout) {
    $scope.haslogin = function(){
    	sessionStorage.setItem("login", "false");
    	$state.go("tabs.my");
    	$scope.isFlag = false;
    }
    
    
    
    
  })
