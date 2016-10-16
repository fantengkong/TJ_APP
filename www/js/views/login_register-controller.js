starterCtrls
  .controller('LoginRegisterController', function ($scope,$state,$timeout) {
    $scope.haslogin = function(){
    	sessionStorage.setItem("haslogin", "false");
    	$state.go("tabs.my");
    	$scope.isFlag = false;
    }
    
    
    
    
  })
