angular.module('starter.routes', [])

.config(['$httpProvider','$stateProvider','$urlRouterProvider',function($httpProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider
  	//配置tabs路由
    .state('tabs', {
      url: '/tab',
      cache: true,
      templateUrl: './tpls/tabs.html',
      controller: 'TabsController'
    })
  	//配置首页的路由
    .state('tabs.home', {
      url: '/home/:mainNav/:nav',
      cache: true,
      params: {
    		'mainNav': 'learn',
    		'nav':'-1'
    	},
      views: {
        'home-tab': {
          templateUrl: './tpls/tab-home.html',
          controller: 'HomeController'
        }
      }
    })
    //配置'活动页面'的路由
    .state('tabs.activity', {
      url: '/activity',
      cache: true,
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
      url: '/tab/:view/:id',
      cache: true,
      params:{
      	'view': null,	
				'id':null
      },
      cache: true,
      templateUrl: './tpls/detail.html',
      controller: 'DetailController'
    })
    //配置'微信关注页'的路由
		.state('login_register', {
      url: '/:mainNav/:nav/:view2/login_register/:id',
      cache: true,
      params: {
      	'nav':null,
      	'mainNav':null,
      	'view': null,
      	'view2':null,
      	'id':null
    	},
      templateUrl: './tpls/login_register.html',
      controller: 'LoginRegisterController'
   })
    //配置直播的路由
  	.state('live', {
  		url: "/:mainNav/:nav/:view2/live/:id/:liveId",
  		cache: false,
  		params:{
  			'mainNav': null,
  			'view2': null,
  			'nav': null,
  			'id':null,
  			'liveId': null
  		},
  		templateUrl: './tpls/live.html',
//		controller: 'LiveController'
  	})
  	//配置直播简介页的路由
  	.state('programDetails', {
  		url: "/:mainNav/:nav/programDetails/:id",
  		cache: false,
  		params:{
  			'nav': null,
  			'id':null,
  			'mainNav':null
  		},
  		templateUrl: './tpls/program-details.html',
//			controller: 'ProgramDetailsController'
  	});
    $urlRouterProvider.otherwise('/tab/home/learn/-1');
}]);