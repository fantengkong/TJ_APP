starterCtrls
	.controller('HomeController', ['userService', 'Chats', '$ionicViewSwitcher', 'localStorageService', '$ionicLoading', 'ApiEndpoint', 'addinfo', '$stateParams', '$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', function(userService, Chats, $ionicViewSwitcher, localStorageService, $ionicLoading, ApiEndpoint, addinfo, $stateParams, $state, $scope, $ionicScrollDelegate, $http, $timeout) {

		//首页变量
		$scope.homeVar = {
			//主导航
			mainNav: $stateParams.mainNav,
			//二级导航
			hSubNav: $stateParams.nav,
			//科目列表
			SubNav: Chats.all(),
			//科目ID参数
			subNavIds: [],
			//精选推荐节目列表
			Items: [],
			//列表是否显示
			ListShow: false,
			//选择科目
			activeNav: $stateParams.nav,
			//是否选择推荐
			isActive: $stateParams.nav == -1 ? true : false,
			//加载页数
			Page: 1,
			//加载更多的数据
			MoreItems: [],
			//幻灯片列表
			slides: '',
			//幻灯片是否显示
			slideShow: false,
			//距顶部高度
			disTop: '',
			//返回按钮是否显示
			backTopShow: false,
			//加载更多是否显示
			DataLoad: false
		};

		//判断是否为分享
		if(!addinfo.isEmptyValue(localStorage.getItem("userwx"))) {
			localStorage.setItem("userwx", '');
		}

		//遮罩层
		$ionicLoading.show({
			template: '加载中...'
		});
		
		//轮播图
		userService.getUsers(ApiEndpoint.url + '/home/getRadioSlide', {
			num: 5
		}).then(function(successResponse) {
			$scope.homeVar.slides = successResponse;
			$scope.homeVar.slideShow = true;
		});

		//学知识tab,看大会tab
		$scope.learn = function() {
			$state.go("tabs.home", {
				mainNav: 'learn',
				nav: -1
			}, {
				reload: true
			});
			$ionicViewSwitcher.nextDirection("false");
		}
		$scope.watch = function() {
			$state.go("tabs.home", {
				mainNav: 'watch',
				nav: -1
			}, {
				reload: true
			});
			$ionicViewSwitcher.nextDirection("false");
		}

		/*回到顶部*/
		$scope.scrollTop = function() {
			$timeout(function() {
				$ionicScrollDelegate.$getByHandle('home').scrollTop(true);
				$scope.homeVar.backTopShow = false;
			})
		};

		/*回到顶部按钮显示消失*/
		$scope.getPos = function() {
			$timeout(function() {
				$scope.homeVar.disTop = $ionicScrollDelegate.$getByHandle('home').getScrollPosition();
				if($scope.homeVar.disTop != undefined) {
					$scope.homeVar.disTop = parseInt($scope.homeVar.disTop.top);
					if($scope.homeVar.disTop > 10) {
						$scope.homeVar.backTopShow = true;
					} else {
						$scope.homeVar.backTopShow = false;
					}
				}
				$scope.$evalAsync();
			})
		}
		
		if($scope.homeVar.mainNav=="learn"){
			$scope.homeVar.fid = 1;
		}else if($scope.homeVar.mainNav=="watch"){
			$scope.homeVar.fid = 2;
		}
		
		userService.getUsers(ApiEndpoint.url + '/home/getProgramSubjects', {
			fid : $scope.homeVar.fid
		}).then(function(successResponse) {
			$scope.homeVar.SubNav = successResponse.list;
		});
		
		//科目列表
		angular.forEach($scope.homeVar.SubNav, function(data, index, array) {
			$scope.homeVar.subNavIds.push(data.id);
		});

		if($scope.homeVar.hSubNav != -1) {
			$scope.homeVar.subNavIds = JSON.stringify([$scope.homeVar.hSubNav]);
			$scope.homeVar.subjectID = $scope.homeVar.hSubNav;
		}else{
			$scope.homeVar.subjectID = '';
		}

		//精选列表推荐列表加载完执行事件
		$scope.$on('ngRepeatOk', function(ngRepeatFinishedEvent) {});
		
		//精选推荐
		//		$http.get('../mock/home/home_liveList.json').then(
		userService.getUsers(ApiEndpoint.url + '/home/getProgramList', {
			cateID: $scope.homeVar.fid,
			subjectID : $scope.homeVar.subjectID, 
			page: 1
		}).then(function(successResponse) {
			$scope.homeVar.Items = successResponse;
//			console.log($scope.homeVar.Items);
			$scope.homeVar.ListShow = true;
			$ionicLoading.hide();
			if(!addinfo.isEmptyValue($scope.homeVar.Items)) {
				$scope.homeVar.DataLoad = true;
			} else {
				$scope.homeVar.DataLoad = false;
			}
		});

		/*跳转到节目详情页*/
		$scope.to_program = function(index, type) {
			$state.go('programDetails', {
				mainNav: $scope.homeVar.mainNav,
				nav: $scope.homeVar.hSubNav,
				id: index,
			});
			$ionicViewSwitcher.nextDirection("forward");
		}

		//点击推荐
		$scope.Recommend = function() {
			$state.go("tabs.home", {
				nav: -1,
				mainNav: $scope.homeVar.mainNav
			}, {
				reload: true
			});
			$ionicViewSwitcher.nextDirection("false");
		}

		//点击二级导航按钮加载数据
		$scope.nav1 = function(index) {
			$state.go("tabs.home", {
				nav: index,
				mainNav: $scope.homeVar.mainNav
			}, {
				reload: true
			});
			$ionicViewSwitcher.nextDirection("false");
		}

		//上拉加载
		$scope.loadMore = function() {
			$scope.homeVar.Page++;
			if(!$("ion-infinite-scroll i").html()) {
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
			}
			
			userService.getUsers(ApiEndpoint.url + '/home/getProgramList', {
				cateID: $scope.homeVar.fid,
				subjectID : $scope.homeVar.subjectID, 
				page: $scope.homeVar.Page
			}).then(function(successResponse) {
				$scope.homeVar.MoreItems = successResponse;
				if($scope.homeVar.MoreItems.length && $scope.homeVar.Items.length) {
					$scope.homeVar.Items = $scope.homeVar.Items.concat($scope.homeVar.MoreItems);
					$scope.homeVar.DataLoad = true;
				} else {
					$scope.homeVar.DataLoad = false;
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		};
		$scope.$on('scroll.stateChangeSuccess', function() {
			$scope.loadMore();
		});

		// 百度统计
		addinfo.baiduCount();

	}]);