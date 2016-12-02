starterCtrls
  .controller('LiveController',['$ionicLoading', '$sce', 'ApiEndpoint','$ionicViewSwitcher', '$scope', '$http', '$ionicScrollDelegate', '$ionicHistory', '$state', '$stateParams', '$timeout',function ($ionicLoading, $sce, ApiEndpoint, $ionicViewSwitcher, $scope, $http, $ionicScrollDelegate, $ionicHistory, $state, $stateParams, $timeout) {
    $ionicLoading.show({
	      template: '数据加载中...'
	  });
	  $http.post(ApiEndpoint.url+'/home/getRadioInfo',{uid:27,id:$stateParams.id})
		.then(
			function(res) {
				$scope.item=res.data;
				console.log($scope.item);
				$scope.visit_url=$sce.trustAsResourceUrl($scope.item.visit_url);
				$ionicLoading.hide();
			}
		);
    $scope._width=$(window).width();
    $scope._height=$(window).height();
    /*返回*/
    $scope.liveBack = function(){
    	if($stateParams.view3){
    		$state.go($stateParams.view2,{view3:$stateParams.view3,view2: $stateParams.view2,view: $stateParams.view,nav: $stateParams.nav, position:$stateParams.position});
		}else if($stateParams.view2){
		$state.go($stateParams.view2,{view: $stateParams.view,nav: $stateParams.nav, position:$stateParams.position,id:$stateParams.id});
		}
    	$ionicViewSwitcher.nextDirection("back");
    }
    
    
    
    
    $scope.keyboard_show = false;
    $scope.viewer ={};
    /*发送聊天*/
    $scope.sendChat = function(){
  		var oDiv=document.createElement('div');
			oDiv.style='clear:both';
			var $Ul=$(".l_chat");
			var $Li=$("ul li.msgContent:last").clone();
			$Li.html("<p><b class='l_right'></b>"+$scope.viewer.Chat+"</p><img src='../img/ben.png'/>");
			if($scope.viewer.Chat.length){
				$Li.appendTo($Ul);
				$ionicScrollDelegate.$getByHandle('liveScroll').scrollBottom();
				$scope.viewer.Chat="";
			}
    }
    function GetQueryString(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		}
    /*判断是否显示关注注公众号*/
   	if(GetQueryString("from")){
   		$scope.TJweixinShow = true;
   	}else{
   		$scope.TJweixinShow = false;
   	}
    /*点赞*/
    $scope.isActived = false;
    $scope.zan = 1234; 
    $scope.liveGood = function(){
    	if($scope.isActived == true){
    		return false;
    	}else{
    		$scope.isActived = true;
    		$scope.zan++;
    	}
    }
   	$scope.commentsOpen = true;
    $scope.commentsClose = false;
    $scope.liveOver = false;
    $timeout(function(){
    	$scope.commentsOpen = false;
	    $scope.commentsClose = true;
    	$scope.liveOver = true;
    },100000);
    	/*判断专家或活动*/
	   $scope.isExpert = true;
	   /*进入探基微信公众号*/
	   $scope.goToTJweixin = function(){
	   	$state.go("login_register",{view:'live',id:$stateParams.id});
	   }
	   $scope.focus = function(){
	   		$scope.keyboard_show = true;
	   }
	   $scope.blur = function(){
	   		$scope.keyboard_show = false;
	   		
	   }
  }]);
