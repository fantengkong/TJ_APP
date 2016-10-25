// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	//$ionicConfigProvider全局配置
	//配置iOS和Android设备下的app风格
  $ionicConfigProvider.platform.ios.tabs.style('standard');//标准的风格
  $ionicConfigProvider.platform.ios.tabs.position('bottom');//位置
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');//标题的显示
  $ionicConfigProvider.platform.ios.views.transition('ios');//过度的动画 三种风格
  
  $ionicConfigProvider.platform.android.tabs.style('standard');//标准的风格
  $ionicConfigProvider.platform.android.tabs.position('bottom');//位置
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');//标题的显示
  $ionicConfigProvider.platform.android.views.transition('ios');//过度的动画 三种风格
  
  $stateProvider
  	//配置tabs路由
    .state('tabs', {
      url: '/tab',
      cache: false,
      templateUrl: './tpls/tabs.html',
      controller: 'TabsController'
    })
    //配置直播的路由
  	.state('live', {
  		url: "/tab/live",
  		cache: false,
  		templateUrl: './tpls/live.html',
  		controller: 'LiveController'
  	})
  	//配置首页的路由
    .state('tabs.home', {
      url: '/home',
      cache: false,
      views: {
        'home-tab': {
          templateUrl: './tpls/tab-home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('tabs.home.watch', {
    	url:'/watch',
    	cache: false,
    	views: {
    		'watch-home': {
    			templateUrl: './tpls/home/watch-home.html'
    		}
    	}
    })
    .state('tabs.home.learn', {
    	url:'/learn',
    	cache: false,
    	views: {
    		'learn-home': {
    			templateUrl: './tpls/home/learn-home.html'
    		}
    	}
    })
    .state('tabs.home.say', {
    	url:'/say',
    	cache: false,
    	views: {
    		'say-home': {
    			templateUrl: './tpls/home/say-home.html'
    		}
    	}
    })
    //配置'活动页面'的路由
    .state('tabs.activity', {
      url: '/activity',
      cache: false,
      views: {
        'activity-tab': {
          templateUrl: './tpls/tab-activity.html',
          controller: 'ActivityController'
        }
      }
    })
    //配置'我的页面'的路由
    .state('tabs.my', {
      url: '/my',
      cache: false,
      	views: {
	        'my-tab': {
	          templateUrl: './tpls/tab-my.html',
	          controller: 'MyController'
	        }
	      }
    })
    //配置'详情页'的路由
    .state('detail', {
      url: '/tab/:detailId',
      //url: '/tab/:homeId',
      
      cache: false,
      templateUrl: './tpls/detail.html',
      controller: 'DetailController'
    })
    //配置'播放页面'的路由
    .state('play', {
      url: '/play/:playId',
      cache: false,
      templateUrl: './tpls/play.html',
      controller: 'PlayController'
    })
    //配置'登录注册'的路由
		.state('login_register', {
      url: '/login_register',
      cache: false,
      templateUrl: './tpls/login_register.html',
      controller: 'LoginRegisterController'
    })
		//配置'分类页面'的路由
    .state('classify', {
      url: '/classify',
      cache: false,
      abstract:true,
      templateUrl: './tpls/classify/classify.html',
      controller: 'ClassifyController'
    })
    //配置'分类页面/看大会页面'的路由
    .state('classify.watch', {
    	url:'/watch',
     	views: {
        'watch-classify': {
          templateUrl: 'tpls/classify/watch-classify.html'
        }
      }
    })
    //配置'分类页面/学知识页面'的路由
    .state('classify.learn', {
    	url:'/learn',
    	views: {
        'learn-classify': {
          templateUrl: 'tpls/classify/learn-classify.html'
        }
      }
    })
  	//配置'分类页面/大咖说页面'的路由
    .state('classify.say', {
    	url:'/say',
    	views: {
        'say-classify': {
          templateUrl: 'tpls/classify/say-classify.html'
        }
      }
    });
    $urlRouterProvider.otherwise('/tab/home');
//  $ionicConfigProvider.tabs.position('bottom');
    
})
.directive('scrollHeight',function($window){
  return{
    restrict:'AE',
    link:function(scope,element,attr){
      element[0].style.height=($window.innerHeight-50)+'px';
    }
  }
})
.directive('scrollHeight1',function($window){
  return{
    restrict:'AE',
    link:function(scope,element,attr){
      element[0].style.height=($window.innerHeight-50-210)+'px';
    }
  }
})
.directive('scrollHeight2',function($window){
  return{
    restrict:'AE',
    link:function(scope,element,attr){
      element[0].style.height=($window.innerHeight-50-210-44)+'px';
    }
  }
});