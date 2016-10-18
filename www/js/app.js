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
  $stateProvider
    .state('tabs', {
      url: '/tab',
      cache: false,
      templateUrl: './tpls/tabs.html',
      controller: 'TabsController'
    })
  	.state('live', {
  		url: "/tab/live",
  		cache: false,
  		templateUrl: './tpls/live.html',
  		controller: 'LiveController'
  	})
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
    .state('detail', {
      url: '/tab/activity/detail',
      cache: false,
      templateUrl: './tpls/detail.html',
      controller: 'DetailController'
    })
    .state('play', {
      url: '/play',
      cache: false,
      templateUrl: './tpls/play.html',
      controller: 'PlayController'
    })
		.state('login_register', {
      url: '/login_register',
      cache: false,
      templateUrl: './tpls/login_register.html',
      controller: 'LoginRegisterController'
    })
    .state('classify', {
      url: '/classify',
      cache: false,
      templateUrl: './tpls/classify.html',
      controller: 'ClassifyController'
    })
    .state('classify.watch', {
      url: '/classify/watch',
      cache: false,
      	views: {
	        'watch-tab': {
	          templateUrl: './tpls/tab-watch.html',
	          controller: 'MyController'
	        }
	      }
    })
    .state('classify.learn', {
      url: '/classify/learn',
      cache: false,
      	views: {
	        'learn-tab': {
	          templateUrl: './tpls/tab-learn.html',
	          controller: 'MyController'
	        }
	      }
    })
    .state('classify.say', {
      url: '/classify/say',
      cache: false,
      	views: {
	        'say-tab': {
	          templateUrl: './tpls/tab-say.html',
	          controller: 'MyController'
	        }
	      }
    });
    $urlRouterProvider.otherwise('/tab/home');
    $ionicConfigProvider.tabs.position('bottom');
    
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
})