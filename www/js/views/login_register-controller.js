starterCtrls
  .controller('LoginRegisterController', ['$scope','$state','$timeout', '$stateParams', function ($scope,$state,$timeout,$stateParams) {
    $scope.haslogin = function(){
    	sessionStorage.setItem("login", "false");
    	$state.go("tabs.my");
    	$scope.isFlag = false;
    	sessionStorage.setItem("weixin","true");
    	
    }  
    $scope.weixin_back = function(){
    	$state.go($stateParams.view);
    }
  }]);
