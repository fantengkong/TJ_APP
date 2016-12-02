starterCtrls
	.controller('HomeController', ['userService', '$ionicLoading','ApiEndpoint','addinfo', '$stateParams', '$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', function(userService, $ionicLoading,ApiEndpoint, addinfo, $stateParams, $state, $scope, $ionicScrollDelegate, $http, $timeout) {
		if(addinfo.GetQueryString("code")){
			localStorage.setItem("code",addinfo.GetQueryString("code") );
			$scope.code = addinfo.GetQueryString("code");
		}
		
		if($scope.code){
			$.get('./weixinAPI/getAccessToken.php', {code: $scope.code}, function(data) {
				$scope.all = JSON.parse(data);
				if($scope.all.subscribe){
					localStorage.setItem("openid",$scope.all.openid);
					$.get('./weixinAPI/getUserInfo.php',{access_token:$scope.all.access_token,openid:$scope.all.openid},function(res){
						$scope.arr2 = JSON.parse(JSON.parse(res).info );
						localStorage.setItem("userInfo",JSON.stringify($scope.arr2));
					} )
				}					
			})
		}
		$ionicLoading.show({
	      template: '数据加载中...'
	  });
		//轮播图							
		$http.post(ApiEndpoint.url+'/home/getRadioSlide',{num:3})
			.then(
				function(res) {
					$scope.lunbo = res.data;
					// console.log(res.data);
					angular.forEach($scope.lunbo, function(data){
						data.logo=ApiEndpoint.url+'/uploads/slide/'+data.logo;
					});
					$scope.slides = $scope.lunbo;
					$scope.slideimgs=true;
					$ionicLoading.hide();
				}
			);
		
		/*回到顶部*/
		$scope.scrollTop = function() {
			$scope.goToTop = false;
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
		};
		/*回到顶部按钮显示消失*/
		$scope.d_top = 0;
		$scope.getPos = function() {
			$scope.d_top = parseInt($ionicScrollDelegate.$getByHandle('h_content').getScrollPosition().top);
			if($scope.d_top > 10) {
				$scope.goToTop = true;
			} else {
				$scope.goToTop = false;
			}
		}
		//节目列表
		$scope.learn_cates=JSON.stringify([4]);
		$scope.watch_cates=JSON.stringify([5,6]);
		$scope.say_cates=JSON.stringify([7,8]);
		//学知识
		$http.post(ApiEndpoint.url+'/home/getRadios',{page:1,cates:$scope.learn_cates})
		.then(
			function(res) {
				$scope.items2 = res.data;
				if($scope.items2){
					addinfo.addInfo($scope.items2);
				}
				$scope.listShow = true;
			}
		);
		$http.post(ApiEndpoint.url+'/home/getRadios',{page:1,cates:$scope.watch_cates})
		.then(
			function(res) {
				$scope.items1 = res.data;
				console.log($scope.items1);
				if($scope.items1){
					addinfo.addInfo($scope.items1);
				}
			}
		);	
		$http.post(ApiEndpoint.url+'/home/getRadios',{page:1,cates:$scope.say_cates})
			.then(
				function(res) {
					$scope.items3 = res.data;
					if($scope.items3){
						addinfo.addInfo($scope.items3);
					}
				}
			);		
			/*判断是否有保存的锚点:跳转位置*/
		if($stateParams.position || $stateParams.position == 0) {
			$timeout(function() {
				$ionicScrollDelegate.$getByHandle('h_content').scrollTo(0, $stateParams.position, [true])
				$stateParams.position = 0;
			}, 100)
		}
	}])
	.controller('home_learnCtrl', ['ApiEndpoint','addinfo', '$ionicViewSwitcher', '$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', '$stateParams', function(ApiEndpoint, addinfo, $ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout, $stateParams) {
		
		//打开分类页
		$scope.openLearnClassify = function() {
				$state.go("classify.learn", {}, {
					reload: true
				});
			}
			//判断有无分类页传的数据
		if(!JSON.parse(localStorage.getItem("learn"))) {
			$http.get('./mock/home/home_classify.json')
				.then(
					function(res) {
						for(var i = 0; i < res.data.cate.length; i++) {
							if(res.data.cate[i].title == "学知识") {
								$scope.navItems2 = res.data.cate[i].son;
								for(var j = 0; j < $scope.navItems2.length; j++) {
									$scope.navItems2[j].selected = true;
								}
							}
						}
					}
				);
		} else {
			$scope.learn = JSON.parse(localStorage.getItem("learn"));
			$scope.navItems2 = $scope.learn;
		}
		/*初始默认推荐按钮*/
		if($stateParams.nav || $stateParams.nav == 0) {
			$scope.activeNavLearn = $stateParams.nav;
			if($scope.activeNavLearn == -1) {
				$scope.isActive2 = true;
			}
		} else {
			$scope.activeNavLearn = -1;
			$scope.isActive2 = true;
		}
		/*学知识跳转到直播简介页*/
		$scope.learn_to_liveprofile = function(index, type) {
				if(type == 0) {
					console.log($scope.activeNavLearn);
					$state.go('play', {
						view: 'tabs.home.learn',
						nav: $scope.activeNavLearn,
						position: $scope.d_top,
						id: index
					});
				} else if(type == 2) {
					$state.go('livePlayBack', {
						view: 'tabs.home.learn',
						nav: $scope.activeNavLearn,
						position: $scope.d_top,
						id: index
					});
				} else {
					$state.go('liveprofile', {
						view: 'tabs.home.learn',
						nav: $scope.activeNavLearn,
						position: $scope.d_top,
						id: index
					});
				}
				$ionicViewSwitcher.nextDirection("forward");
			}
			/*点击学知识推荐*/
			$scope.learnRecommend = function() {
				$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
				$state.go("tabs.home.learn", {nav: -1});
				return false;
			}
		//点击二级导航按钮加载数据
		$scope.navLearn = function(index) {
			$timeout(function() {
				$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
			}, 1)
			$state.go("tabs.home.learn", {nav: index});
				return false;
			
		}
			/*上拉加载更多*/
			/*每次加载的行数*/
		$scope.page = 1;
		/*是否加载*/
		$scope.learnDataLoad = true;
		$scope.loadMoreLearn = function() {
			$scope.page++;
			if(!$("ion-infinite-scroll i").html()) {
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
			}
			if($stateParams.nav&&$stateParams.nav!=-1){
				$scope.cates=JSON.stringify([$stateParams.nav]);
			}else{
				$scope.cates = JSON.stringify([4]);
			}
				$http.post(ApiEndpoint.url+'/home/getRadios',{page:$scope.page,cates:$scope.cates})
				.then(
					function(res) {
						console.log(res);
						$scope.item22 = res.data;
						console.log($scope.items2);
						if($scope.item22.length) {
							addinfo.addInfo($scope.item22);
							$scope.items2 = $scope.items2.concat($scope.item22);
							$scope.learnDataLoad = true;
						} else {
							$("ion-infinite-scroll").prepend("<i>没有更多了</i>").css("color", "#b0aba8");
							$scope.learnDataLoad = false;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				);
		};
		$scope.$on('scroll.infiniteScrollComplete', function() {
//			$scope.loadMoreLearn();
		});
	}])
	.controller('home_watchCtrl', ['ApiEndpoint','addinfo', '$ionicViewSwitcher', '$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', '$stateParams', function(ApiEndpoint, addinfo, $ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout, $stateParams) {
		
		/*打开看大会分类页*/
		$scope.openWatchClassify = function() {
				$state.go("classify.watch", {}, {
					reload: true
				});
			}
			/*判断本地存储*/
		if(!JSON.parse(localStorage.getItem("watch"))) {
			$http.get('./mock/home/home_classify.json')
				.then(
					function(res) {
						for(var i = 0; i < res.data.cate.length; i++) {
							if(res.data.cate[i].title == "看大会") {
								$scope.navItems1 = res.data.cate[i].son;
								for(var j = 0; j < $scope.navItems1.length; j++) {
									$scope.navItems1[j].selected = true;
								}
							}
						}
					}
				);
		} else {
			$scope.navItems1 = [];
			$scope.watch = JSON.parse(localStorage.getItem("watch"));
			for(var i = 0; i < $scope.watch.length; i++) {
				if($scope.watch[i].selected == true) {
					$scope.navItems1.push($scope.watch[i]);
				}
			}
		}
		/*初始默认推荐按钮*/
		if($stateParams.nav || $stateParams.nav == 0) {
			$scope.activeNavWatch = $stateParams.nav;
			if($scope.activeNavWatch == -1) {
				$scope.isActive1 = true;
			}
		} else {
			$scope.activeNavWatch = -1;
			$scope.isActive1 = true;
		}
		$scope.watch_to_liveprofile = function(index, type) {
				if(type == 0) {
					$state.go('play', {
						view: 'tabs.home.watch',
						nav: $scope.activeNavWatch,
						position: $scope.d_top,
						id:index
					});
				} else if(type == 2) {
					$state.go('livePlayBack', {
						view: 'tabs.home.watch',
						nav: $scope.activeNavWatch,
						position: $scope.d_top,
						id:index
					});
				} else {
					$state.go('liveprofile', {
						view: 'tabs.home.watch',
						nav: $scope.activeNavWatch,
						position: $scope.d_top,
						id:index
					});
				}
				$ionicViewSwitcher.nextDirection("forward");
			}
			/*点击看大会推荐*/
		$scope.watchRecommend = function() {
			$timeout(function() {
				$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
			}, 1)
			$state.go("tabs.home.watch", {
				nav: -1
			});
			return false;
		}

		//点击二级导航按钮加载数据
		$scope.navWatch = function(index) {
			$timeout(function() {
				$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
			}, 1)
			$state.go("tabs.home.watch", {
				nav: index
			});
			return false;
		}

		/*上拉加载更多*/
		/*每次加载的行数*/
		$scope.page = 1;
		/*是否加载*/
		$scope.watchDataLoad = true;
		$scope.loadMoreWatch = function() {
			$scope.page++;
			if(!$("ion-infinite-scroll i").html()) {
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
			}
			$timeout(function() {
				$scope.cates=JSON.stringify([1,2,3,4]);
				$http.post(ApiEndpoint.url+'/home/getRadios',{page:$scope.page,cates:$scope.cates})
					.then(
						function(res) {
							$scope.item11 = res.data;
							if($scope.item11&&$scope.item1) {
								addinfo.addInfo($scope.item11);
								$scope.items1 = $scope.items1.concat($scope.item11);
								$scope.watchDataLoad = true;
							} else {
								$("ion-infinite-scroll").prepend("<i>没有更多了</i>").css("color", "#b0aba8");
								$scope.watchDataLoad = false;
							}
							$scope.$broadcast('scroll.infiniteScrollComplete');
						}
					);
			}, 1000)

		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			$scope.loadMoreWatch();
		});
	}])
	.controller('home_sayCtrl', ['ApiEndpoint','addinfo', '$ionicViewSwitcher', '$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', '$stateParams', function(ApiEndpoint, addinfo, $ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout, $stateParams) {
		//轮播图							
		$http.post(ApiEndpoint.url+'/home/getRadioSlide',{num:3})
			.then(
				function(res) {
					$scope.lunbo = res.data;
					// console.log(res.data);
					angular.forEach($scope.lunbo, function(data){
						data.logo=ApiEndpoint.url+'/uploads/slide/'+data.logo;
					});
					$scope.slides3 = $scope.lunbo;
				}
			);
		$scope.openSayClassify = function() {
			$state.go("classify.say", {}, {
				reload: true
			});
		}
		if(!JSON.parse(localStorage.getItem("say"))) {
			$http.get('./mock/home/home_classify.json')
				.then(
					function(res) {
						for(var i = 0; i < res.data.cate.length; i++) {
							if(res.data.cate[i].title == "大咖说") {
								$scope.navItems3 = res.data.cate[i].son;
								for(var j = 0; j < $scope.navItems3.length; j++) {
									$scope.navItems3[j].selected = true;
								}
							}
						}
					}
				);
		} else {
			$scope.navItems3 = [];
			$scope.say = JSON.parse(localStorage.getItem("say"));
			for(var i = 0; i < $scope.say.length; i++) {
				if($scope.say[i].selected == true) {
					$scope.navItems3.push($scope.say[i]);
				}
			}
		}
		/*初始默认推荐按钮*/
		if($stateParams.nav || $stateParams.nav == 0) {
			$scope.activeNavSay = $stateParams.nav;
			if($scope.activeNavSay == -1) {
				$scope.isActive3 = true;
			}
		} else {
			$scope.activeNavSay = -1;
			$scope.isActive3 = true;
		}
		/*大咖说跳转到直播简介页*/
		$scope.say_to_liveprofile = function(index, type) {
				if(type == 0) {
					$state.go('play', {
						view: 'tabs.home.say',
						nav: $scope.activeNavSay,
						position: $scope.d_top,
						id:index
					});
				} else if(type == 2) {
					$state.go('livePlayBack', {
						view: 'tabs.home.say',
						nav: $scope.activeNavSay,
						position: $scope.d_top,
						id:index
					});
				} else {
					$state.go('liveprofile', {
						view: 'tabs.home.say',
						nav: $scope.activeNavSay,
						position: $scope.d_top,
						id:index
					});
				}
				$ionicViewSwitcher.nextDirection("forward");
			}
			/*点击看大会推荐*/
		$scope.sayRecommend = function() {
				$timeout(function() {
					$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
				}, 1)
				$state.go("tabs.home.say", {
					nav: -1
				});
				return false;
			}
			//点击二级导航按钮加载数据
		$scope.navSay = function(index) {
				$timeout(function() {
					$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
				}, 1)
				$state.go("tabs.home.say", {
					nav: index
				});
				return false;
			}
			/*上拉加载更多*/
		/*每次加载的行数*/
		$scope.page = 1;
		/*是否加载*/
		$scope.sayDataLoad = true;
		$scope.loadMoreSay = function() {
			$scope.page++;
			if(!$("ion-infinite-scroll i").html()) {
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
			}
			$timeout(function() {
				$scope.cates=JSON.stringify([1,2,3,4]);
				$http.post(ApiEndpoint.url+'/home/getRadios',{page:$scope.page,cates:$scope.cates})
					.then(
						function(res) {
							$scope.item33 = res.data;
							if($scope.item33&&$scope.item3) {
								addinfo.addInfo($scope.item33);
								$scope.items3 = $scope.items3.concat($scope.item33);
								$scope.sayDataLoad = true;
							} else {
								$("ion-infinite-scroll").prepend("<i>没有更多了</i>").css("color", "#b0aba8");
								$scope.sayDataLoad = false;
							}
							$scope.$broadcast('scroll.infiniteScrollComplete');
						}
					);
//				$http.get('./mock/home/home_liveList.json').success(function(items) {
//					/*总加载次数*/
//					addinfo.addInfo(items);
//					if(items) {
//						$scope.items3 = $scope.items3.concat(items);
//						$scope.sayDataLoad = true;
//					} else {
//						$("ion-infinite-scroll").prepend("<i>没有更多了</i>").css("color", "#b0aba8");
//						$timeout(function() {
//							$scope.sayDataLoad = false;
//						},1000)
//					}
//					$scope.$broadcast('scroll.infiniteScrollComplete');
//				})
			}, 1000)

		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			$scope.loadMoreSay();
		});
	}]);