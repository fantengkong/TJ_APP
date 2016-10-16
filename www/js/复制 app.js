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
//    cache: false,
      templateUrl: './tpls/tabs.html',
      controller: 'TabsController'
    })

    .state('tabs.home', {
      url: '/home',
//    cache: false,
      views: {
        'home-tab': {
          templateUrl: './tpls/tab-home.html',
          controller: 'HomeController'
        }
      }
    })
    

    .state('tabs.activity', {
      url: '/activity',
//    cache: false,
      views: {
        'activity-tab': {
          templateUrl: './tpls/tab-activity.html',
          controller: 'ActivityController'
        }
      }
    })

    .state('tabs.my', {
      url: '/my',
//    cache: false,
      	views: {
	        'my-tab': {
	          templateUrl: './tpls/tab-my.html',
	          controller: 'MyController'
	        }
	      }
    })
    .state('detail', {
      url: '/tab/activity/detail',
//    cache: false,
      templateUrl: './tpls/detail.html',
      controller: 'DetailController'
    })
    .state('play', {
      url: '/play',
//    cache: false,
      templateUrl: './tpls/play.html',
      controller: 'PlayController'
    })
		.state('login_register', {
      url: '/login_register',
//    cache: false,
      templateUrl: './tpls/login_register.html',
      controller: 'LoginRegisterController'
    })
    .state('classify', {
      url: '/classify',
//    cache: false,
      templateUrl: './tpls/classify.html',
      controller: 'ClassifyController'
    });
    $urlRouterProvider.otherwise('/tab');
    $ionicConfigProvider.tabs.position('bottom');
    
})
