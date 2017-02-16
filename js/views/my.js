starterCtrls

/*ON十二.我的页面js=================================================================*/
.controller('MyController', ['$ionicLoading', 'localStorageService', '$ionicPopup', 'ApiEndpoint', 'addinfo', '$stateParams', '$ionicViewSwitcher', '$state', '$scope', '$ionicTabsDelegate', '$http', function($ionicLoading, localStorageService, $ionicPopup, ApiEndpoint, addinfo, $stateParams, $ionicViewSwitcher, $state, $scope, $ionicTabsDelegate, $http) {

		if(addinfo.GetQueryString("code")) {
			$ionicLoading.show({
				template: '加载中...'
			});
			if(!localStorage.getItem("login")) {
				$.get('./weixinAPI/getAccessToken.php', {
					code: addinfo.GetQueryString("code")
				}, function(data) {
					$scope.all = JSON.parse(data);
					//	console.log($scope.all);
					localStorage.setItem("login", true);
					localStorage.setItem("openid", $scope.all.openid);
					localStorage.setItem("access_token", $scope.all.access_token);
					localStorage.setItem("refresh_token", $scope.all.refresh_token);
					window.location.href = window.location.href.replace(window.location.search, "");
				})
			} else {
				window.location.href = window.location.href.replace(window.location.search, "");
			}

		}

		$scope.hasSeen = false;
		$scope.login = localStorage.getItem("login") ? true : false;
		//		$scope.login = false;	
		$scope.openid = localStorage.getItem("openid") ? true : false;
		$scope.access_token = localStorage.getItem("access_token") ? true : false;

		if($scope.login == true && $scope.openid == true && $scope.access_token == true) {
			$ionicLoading.show({
				template: '加载中...'
			});
			$.get('./weixinAPI/getRefreshAccessToken.php', {
				refresh_token: localStorage.getItem("refresh_token")
			}, function(res) {
				$scope.all = JSON.parse(res);
				localStorage.setItem("access_token", $scope.all.access_token);
				localStorage.setItem("refresh_token", $scope.all.refresh_token);
				$.get('./weixinAPI/getUserInfo.php', {
					access_token: localStorage.getItem("access_token"),
					openid: localStorage.getItem("openid")
				}, function(res) {
					//					alert(JSON.parse(res).status);
					if(JSON.parse(res).status == 4002) {
						localStorage.setItem("login", "");
						localStorage.setItem("access_token", "");
						localStorage.setItem("code", "");
						localStorage.setItem("openid", "");
						localStorage.setItem("uid", "");
						localStorage.setItem("refresh_token", "");
						window.location.reload();
					}
					$scope.speaker = JSON.parse(JSON.parse(res).info);
					$http.post(ApiEndpoint.url + '/home/getPersonInfo', {
							userinfo: JSON.stringify($scope.speaker)
						})
						.then(
							function(res) {
								localStorage.setItem("uid", res.data.uid);

								$scope.back_url = localStorage.getItem("url") ? true : false;
								if($scope.back_url) {
									window.location.href = localStorage.getItem("url");
								}
								$http.post(ApiEndpoint.url + '/home/getPersonSkinRecord', {
										uid: res.data.uid,
										page: 1
									})
									.then(function(res) {
										$scope.mySeens = res.data;
										console.log(res);
										
										$scope.hasSeen = true;
										
										addinfo.setTitle("探基-基因行业互助学习平台");
										
										$("meta[name='keywords']").attr("content", "基因检测,NGS,精准医学,探基,直播");
										$ionicLoading.hide();
									})
							}
						)
				})
			})

			
			$scope.$on('$ionicView.afterEnter', function() {
				addinfo.setTitle("探基-基因行业互助学习平台");
				$("meta[name='keywords']").attr("content", "基因检测,NGS,精准医学,探基,直播");
				$scope.$evalAsync();
			}, false);
			
			$scope.looked_to_play = function(index) {
				
				$state.go("programDetails", {
					mainNav: 'tabs.my',
					id: index
				});
				$ionicViewSwitcher.nextDirection("forward");
			};

			$scope.page = 1;
			$scope.myDataLoad = true;
			$scope.loadMoreVideo = function() {
				$scope.page++;
				$http.post(ApiEndpoint.url + '/home/getPersonSkinRecord', {
						page: $scope.page,
						uid: localStorage.getItem('uid')
					})
					.then(
						function(res) {
							$scope.item22 = res.data;
							if($scope.item22.length && $scope.mySeens) {
								$scope.mySeens = $scope.mySeens.concat($scope.item22);
								$scope.myDataLoad = true;
							} else {
								$scope.myDataLoad = false;
							}
							$scope.$broadcast('scroll.infiniteScrollComplete');
						}
					);
			};
			$scope.$on('stateChangeSuccess', function() {
				$scope.loadMoreVideo();
			});
		} else {
			if($scope.login == true) {
				localStorage.setItem("login", "");
				localStorageService.clear("access_token");
				localStorageService.clear("info");
				localStorageService.clear("code");
				localStorageService.clear("openid");
				localStorage.setItem("uid", "");
				localStorageService.clear("refresh_token");
				window.location.reload();
			}

			$scope.wxLogin = function() {
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == "micromessenger") {
					window.location.href = ApiEndpoint.wx_redirecturl;
				} else {
					$state.go("login_register", {
						view: 'tabs.my'
					});
				}
			}
		}
		
		// 百度统计
		addinfo.baiduCount();

	}])
	/*END我的页面js********************************************************************/

/*ON十三.微信关注页js=================================================================*/
.controller('LoginRegisterController', ['addinfo','$ionicViewSwitcher', 'localStorageService', '$scope', '$state', '$timeout', '$stateParams', function(addinfo, $ionicViewSwitcher, localStorageService, $scope, $state, $timeout, $stateParams) {
		if(!localStorageService.get("uid")) {
			localStorage.setItem("uid", "");
		}
	
		console.log($stateParams);

		addinfo.setTitle("探基-基因行业互助学习平台");

		$scope.weixin_back = function() {
			if($stateParams.view2) {
				$state.go($stateParams.view2, {
					nav:$stateParams.nav,
					mainNav: $stateParams.mainNav,
					id: $stateParams.id
				});
				$ionicViewSwitcher.nextDirection("back");
			} else if($stateParams.view){
				$state.go($stateParams.view,{
					mainNav:$stateParams.mainNav,
					nav:$stateParams.nav,
					id: $stateParams.id
				});
				$ionicViewSwitcher.nextDirection("back");
			}
		}

	}])
	/*END微信关注页js********************************************************************/