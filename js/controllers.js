var starterCtrls = angular.module('starter.controllers', [])
/*
	一.首页js
		二.节目详情页js
			三.直播页js
	四.活动页js
		五.活动详情页js
	六.我的页面js
		七.微信关注页js
 */
.controller('indexCtrl', ['localStorageService', 'addinfo', '$scope', '$state', function(localStorageService, addinfo, $scope, $state) {

		//设置本地存储uid为空字符串
		if(!localStorage.getItem("uid")) {
			localStorage.setItem("uid", '');
		}

		//地址栏截取code
		if(addinfo.GetQueryString("code")) {
			localStorage.setItem("code", addinfo.GetQueryString("code"));
		}

		//判断是否为分享
		if(addinfo.GetQueryString("from")) {
			localStorage.setItem("userwx", addinfo.GetQueryString("from"));
			window.location.href = window.location.href.replace(window.location.search, "");
		}
		
		$scope.$on('$ionicView.afterEnter', function() {
			
		},false);

	}])
	.controller('TabsController', ['$http', 'ApiEndpoint', 'addinfo', '$scope', '$state', function($http, ApiEndpoint, addinfo, $scope, $state) {
		
		$scope.$on('$ionicView.afterEnter', function() {
			addinfo.setTitle("探基-基因行业互助学习平台");
			$("meta[name='keywords']").attr("content", "基因检测,NGS,精准医学,探基,直播");
			$scope.$evalAsync();
		},false);
		
	}])
