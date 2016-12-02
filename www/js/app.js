// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers','ngAnimate','starter.services'])
angular.module('starter', ['ionic', 'starter.controllers', 'starter.routes', 'starter.services', 'starter.directives', 'ngStorage'])
	.constant('ApiEndpoint', {
		url: 'http://admintest.tj.seq.cn'
	})
	.config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider, $httpProvider) {
		$ionicConfigProvider.tabs.position('bottom'); // other values: top
		
		//$ionicConfigProvider全局配置
		//配置iOS和Android设备下的app风格
		$ionicConfigProvider.platform.ios.tabs.style('standard'); //标准的风格
		$ionicConfigProvider.platform.ios.tabs.position('bottom'); //位置
		$ionicConfigProvider.platform.ios.navBar.alignTitle('center'); //标题的显示
		$ionicConfigProvider.platform.ios.views.transition('ios'); //过度的动画 三种风格

		$ionicConfigProvider.platform.android.tabs.style('standard'); //标准的风格
		$ionicConfigProvider.platform.android.tabs.position('bottom'); //位置
		$ionicConfigProvider.platform.android.navBar.alignTitle('center'); //标题的显示
		$ionicConfigProvider.platform.android.views.transition('ios'); //过度的动画 三种风格
		$ionicConfigProvider.views.transition('none');
		//$ionicConfigProvider.scrolling.jsScrolling(false);
		/*每次请求都会被拦截并且会把认证头部和值放到头部中*/
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
			return {
				'request': function(config) {
					config.headers = config.headers || {};
					if($localStorage.token) {
						config.headers.Authorization = 'Bearer ' + $localStorage.token;
					}
					return config;
				},
				'responseError': function(response) {
					if(response.status === 401 || response.status === 403) {
						console.log(1);
					}
					return $q.reject(response);
				}
			};
		}]);
		$httpProvider.defaults.transformRequest = function(obj){
			var str = [];
			for(var p in obj){
				str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
			}
			return str.join("&");
		}
		$httpProvider.defaults.headers.post = {
			'Content-Type':'application/x-www-form-urlencoded'
		}
	}])
	.run(['$ionicPlatform',function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if(window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	}])