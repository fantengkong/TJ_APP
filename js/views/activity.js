starterCtrls
/*ON八.活动页js=================================================================*/
.controller('ActivityController', ['userService', '$ionicLoading', 'ApiEndpoint', 'addinfo', 'localStorageService', '$ionicViewSwitcher', '$scope', '$http', '$state', function(userService, $ionicLoading, ApiEndpoint, addinfo, localStorageService, $ionicViewSwitcher, $scope, $http, $state) {
		//变量
		$scope.activity_lastest = false;
		$scope.page = 1;
		$scope.latestActivities = [];
		$scope.moreLastest = [];
		
		/*获取数据*/
		userService.getUsers(ApiEndpoint.url + '/home/getActivities', {type: 1,page: 1}).then(function(successResponse){
			$scope.latestActivities = successResponse;
			$ionicLoading.hide();
			if($scope.latestActivities.length) {
				$scope.activity_lastest = true;
			} else {
				$scope.activity_lastest = false;
			}
		})

		//数据加载中，完成消失
		$ionicLoading.show({
			template: '加载中...'
		});

		//跳转活动详情
		$scope.last_to_detail = function(idIndex,type,index) {
			if(type==0){
				window.location.href = $scope.latestActivities[index].url;
			}else{
				$state.go("detail", {
					view: 'activity',
					id: idIndex
				});
			}
			$ionicViewSwitcher.nextDirection("forward");
		};

		//上拉加载更多		
		$scope.load_morelastest = function() {
			if(!$("ion-infinite-scroll i").html()) {
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color", "#b0aba8");
			}
			$scope.page++;
			userService.getUsers(ApiEndpoint.url + '/home/getActivities', {type: 1,page: $scope.page}).then(function(successResponse){
				$scope.moreLastest = successResponse;
				if($scope.moreLastest.length && $scope.latestActivities.length) {
					$scope.latestActivities = $scope.latestActivities.concat($scope.moreLastest);
					$scope.activity_lastest = true;
				} else {
					$scope.activity_lastest = false;
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		};
		
		$scope.$on('scroll.infiniteScrollComplete', function() {

		});
		
		// 百度统计
		addinfo.baiduCount();
		
	}])
	/*END活动页js********************************************************************/


/*ON十一.活动详情页js=================================================================*/
.controller('DetailController', ['userService', '$window', 'addinfo', 'localStorageService', '$log', 'dateService', '$ionicLoading', 'ApiEndpoint', '$ionicViewSwitcher', '$scope', '$state', '$stateParams', '$http', '$ionicHistory', function(userService, $window, addinfo, localStorageService, $log, dateService, $ionicLoading, ApiEndpoint, $ionicViewSwitcher, $scope, $state, $stateParams, $http, $ionicHistory) {
		
		$scope.$on('$destroy', function() {
			if(!addinfo.isEmptyValue(localStorage.getItem("userwx"))){
				localStorage.setItem("userwx",'');
				localStorageService.clear("userwx");
			}
		});

		//判断是否分享
		$scope.followTJ_WX = localStorage.getItem("userwx") ? true : false;
		
		if($scope.followTJ_WX){
			$scope.wx_height = parseInt($window.innerWidth/9.3);
			$scope.has_wx = {"height":''+$scope.wx_height+'px'};
			$scope.has_top = {"top":''+$scope.wx_height+'px'};
		}else{
			$scope.has_wx = {"height":0};
			$scope.has_top = {"top":0};
		}
		
		window.onresize = function(){
			if($scope.followTJ_WX){
				$scope.wx_height = parseInt($window.innerWidth/9.3);
				$scope.has_wx = {"height":''+$scope.wx_height+'px'};
				$scope.has_top = {"top":''+$scope.wx_height+'px'};
			}else{
				$scope.has_wx = {"height":0};
				$scope.has_top = {"top":0};
			}
			$scope.$evalAsync();
		}
	
		/*返回首页*/
		$scope.go_home = function(){
			$state.go("tabs.home");
			$ionicViewSwitcher.nextDirection("forward");
		}

		/*底部栏状态*/
		$scope.attend = false;
		$scope.close = false;
		$scope.begin_soon = false;
		$ionicLoading.show({
			template: '加载中...'
		});
		/*跳转上页*/
		$scope.dBack = function() {
			if($stateParams.view) {
				$state.go('tabs.'+$stateParams.view);
				$ionicViewSwitcher.nextDirection("back");
			} else {
				$state.go("tabs.home");
				$ionicViewSwitcher.nextDirection("back");
			}
		}


		//当前时间  2016-12-07 11:21
		var newTime = new Date();
		var formatDateTime = function(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			minute = minute < 10 ? ('0' + minute) : minute;
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':00';
		};
		var nowTime = formatDateTime(newTime);
//		console.log(nowTime);
		
		//获取数据
		userService.getUsers(ApiEndpoint.url + '/home/getActivityInfo', {id: $stateParams.id,uid: localStorage.getItem("uid")}).then(function(successResponse){
			$scope.activityDetail = successResponse;
			console.log($scope.activityDetail);
			$scope.attend = false; //报名banner
			$scope.close = false; //关闭banner
			$scope.begin_soon = false; //预告banner				
			if($scope.activityDetail.type == 1) {
				/*0为仅展示 1为预告时间至开始时间 2为开始时间至结束时间 3预告时间至结束时间  4一直显示*/
				if($scope.activityDetail.jointype == 0) {

				} else if($scope.activityDetail.jointype == 1) {

					if(nowTime < $scope.activityDetail.pretime) {

					} else if(nowTime > $scope.activityDetail.pretime && nowTime < $scope.activityDetail.startime) {
						$scope.attend = true;
					} else if(nowTime > $scope.activityDetail.startime && nowTime < $scope.activityDetail.endtime) {

					} else {
						$scope.close = true;
					}
				} else if($scope.activityDetail.jointype == 2) {
					if(nowTime < $scope.activityDetail.pretime) {

					} else if(nowTime > $scope.activityDetail.pretime && nowTime < $scope.activityDetail.startime) {
						$scope.begin_soon = true;
					} else if(nowTime > $scope.activityDetail.startime && nowTime < $scope.activityDetail.endtime) {
						$scope.attend = true;
					} else {
						$scope.close = true;
					}
				} else if($scope.activityDetail.jointype == 3) {
					if(nowTime < $scope.activityDetail.pretime) {

					} else if(nowTime > $scope.activityDetail.pretime && nowTime < $scope.activityDetail.startime) {
						$scope.attend = true;
					} else if(nowTime > $scope.activityDetail.startime && nowTime < $scope.activityDetail.endtime) {
						$scope.attend = true;
					} else {
						$scope.close = true;
					}
				} else if($scope.activityDetail.jointype == 4) {
					if(nowTime < $scope.activityDetail.pretime) {
						$scope.attend = true;
					} else if((nowTime > $scope.activityDetail.pretime) && (nowTime < $scope.activityDetail.startime)) {
						$scope.attend = true;
					} else if((nowTime > $scope.activityDetail.startime) && (nowTime < $scope.activityDetail.endtime)) {
						$scope.attend = true;
					} else {
						$scope.close = true;
					}
				}
			} else {
				$scope.attend = true;
				$scope.close = false;
				$scope.begin_soon = false;
			}

			//活动地址存在
			if($scope.activityDetail.address) {
				$scope.place = true;
			} else {
				$scope.place = false;
			}

			//活动时间存在
			if($scope.activityDetail.startime) {
				$scope.time = true;
			} else {
				$scope.time = false;
			}
			$scope.$broadcast('data.finish');
			$ionicLoading.hide();
				
		})
			
			$scope.$on('data.finish', function() {
				addinfo.setTitle($scope.activityDetail.title);
				$("meta[name='keywords']").attr("content", "基因检测,NGS,精准医学,探基,直播");
				$scope.$evalAsync();
			});
			
			// 百度统计
			addinfo.baiduCount();

	}]);
	/*END活动详情页js********************************************************************/
