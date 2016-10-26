starterCtrls
  .controller('LiveController',['$scope', '$http', '$ionicScrollDelegate', '$ionicHistory', '$state', function ($scope, $http, $ionicScrollDelegate, $ionicHistory, $state) {
    $scope.sendChat = function(){
  		var oDiv=document.createElement('div');
			oDiv.style='clear:both';
			var $Ul=$(".l_chat");
			console.log($Ul);
			var $Li=$("ul li.msgContent:last").clone();
			
			$Li.html("<p><b class='l_right'></b>"+$scope.Chat+"</p><img src='../img/ben.png'/>");
			if($scope.Chat.length>0){
				$Li.appendTo($Ul);
				$ionicScrollDelegate.$getByHandle('liveScroll').scrollBottom();
				$scope.Chat="";
			}
    }
    $scope.isActived = false;
    $scope.liveGood = function(){
    	$scope.isActived = true;
    }
    
//  $scope.liveBack = function(){
//  	$ionicHistory.backView();
//  } 

    $scope.liveBack = function(){
    	$state.go("tabs.activity");
    } 
    
  }]);
