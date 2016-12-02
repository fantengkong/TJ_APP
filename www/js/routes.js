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
      url: '/home',
      cache: true,
      params: {
    		'nav':null,
    		'position':null
    	},
      views: {
        'home-tab': {
          templateUrl: './tpls/tab-home.html',
          controller: 'HomeController'
        }
      }
    })
  	//配置首页-看大会的路由    
    .state('tabs.home.watch', {
    	url:'/watch/:nav',
    	cache: true,
    	params: {
    		'nav': null,
    		'position':null
    	},
    	views: {
    		'watch-home': {
    			templateUrl: './tpls/home/watch-home.html'
    		}
    	}
    })
  	//配置首页-学知识的路由    
    .state('tabs.home.learn', {
    	url:'/learn/:nav',
    	cache: true,
    	params: {
    		'nav':null,
    		'position':null
    	},
    	views: {
    		'learn-home': {
    			templateUrl: './tpls/home/learn-home.html'
    		}
    	}
    })
  	//配置首页-大咖说的路由    
    .state('tabs.home.say', {
    	url:'/say/:nav',
    	cache: true,
    	params: {
    		'nav':null,
    		'position':null
    	},
    	views: {
    		'say-home': {
    			templateUrl: './tpls/home/say-home.html'
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
    //配置'活动->最新活动'的路由
    .state('tabs.activity.lastest', {
      url: '/lastest',
      cache: true,
      views: {
        'lastestAct': {
          templateUrl: './tpls/activity/lastestAct.html',
        }
      }
    })
    //配置'活动->往期活动'的路由
    .state('tabs.activity.past', {
      url: '/past',
      cache: true,
      views: {
        'pastAct': {
          templateUrl: './tpls/activity/pastAct.html',
        }
      }
    })
    //配置'我的页面'的路由
    .state('tabs.my', {
      url: '/my',
      cache: true,
      	views: {
	        'my-tab': {
	          templateUrl: './tpls/tab-my.html',
	          controller: 'MyController'
	        }
	      }
    })
    //配置'我的页面->我的视频'的路由
    .state('tabs.my.myVedio', {
      url: '/myVedio',
      cache: true,
      	views: {
	        'myVedio-my': {
	          templateUrl: './tpls/my/myVedio.html',
	        }
	      }
    })
    //配置'我的页面->我看过的'的路由
    .state('tabs.my.myLooked', {
      url: '/myLooked',
      cache: true,
      	views: {
	        'myLooked-my': {
	          templateUrl: './tpls/my/myLooked.html',
	        }
	      }
    })
    //配置'详情页'的路由
    .state('detail', {
      url: '/tab/:view/:nav/:position/:view2/:id',
      params:{
      	'view': null,
      	'view2': null,	
		'nav': null,
		'position': null,
		'id':null
      },
      cache: true,
      templateUrl: './tpls/detail.html',
      controller: 'DetailController'
    })
    //配置'播放页面'的路由
    .state('play', {
      url: '/:view/:nav/:position/:view2/play/:id',
      cache: true,
      params: {
      	'position':null,
    		'view': null,
    		'view2': null,
    		'nav':null,
    		'id':null
    	},
      templateUrl: './tpls/play.html',
      controller: 'PlayController'
    })//配置'回放放页面'的路由
    .state('livePlayBack', {
      url: '/:view/:nav/:position/:view2/livePlayBack/:id',
      cache: true,
      params: {
      	'nav':null,
      	'position':null,
    		'view': null,
    		'view2': null,
    		'id':null
    	},
      templateUrl: './tpls/livePlayBack.html',
      controller: 'livePlayBackController'
    })
    //配置'登录注册'的路由
		.state('login_register', {
      url: '/:view/login_register',
      cache: true,
      params: {
      	'view': null
    	},
      templateUrl: './tpls/login_register.html',
      controller: 'LoginRegisterController'
    })
		//配置'分类页面'的路由
    .state('classify', {
      url: '/classify',
      cache: true,
      abstract:true,
      templateUrl: './tpls/classify/classify.html',
      controller: 'ClassifyController'
    })
    //配置'分类页面/看大会页面'的路由
    .state('classify.watch', {
    	url:'/watch',
    	cache: true,
     	views: {
        'watch-classify': {
          templateUrl: 'tpls/classify/watch-classify.html'
        }
      }
    })
    //配置'分类页面/学知识页面'的路由
    .state('classify.learn', {
    	url:'/learn',
    	cache: true,
    	views: {
        'learn-classify': {
          templateUrl: 'tpls/classify/learn-classify.html'
        }
      }
    })
  	//配置'分类页面/大咖说页面'的路由
    .state('classify.say', {
    	url:'/say',
    	cache: true,
    	views: {
        'say-classify': {
          templateUrl: 'tpls/classify/say-classify.html'
        }
      }
    })
    //配置直播的路由
  	.state('live', {
  		url: "/:view/:nav/:position/:view2/:view3/live/:id",
  		cache: true,
  		params:{
  			'view3':null,
  			'view': null,
  			'view2': null,
  			'info': null,
  			'nav': null,
  			'position': null,
  			'id':null
  		},
  		templateUrl: './tpls/live.html',
  		controller: 'LiveController'
  	})
    //配置直播简介页的路由
  	.state('liveprofile', {
  		url: "/:view/:nav/:view3/:position/liveprofile/:id",
  		cache: true,
  		params:{
  			'view3':null,
  			'view': null,
  			'info': null,
  			'nav': null,
  			'position': null,
  			'id':null
  		},
  		templateUrl: './tpls/live/live_profile.html',
  		controller: 'LiveProfileController'
  	});
    $urlRouterProvider.otherwise('/tab/home');
}]);