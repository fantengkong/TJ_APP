starterCtrls

/*ON七.直播页js=================================================================*/
.controller('LiveController', ['addinfo', 'localStorageService', '$ionicLoading', '$sce', 'ApiEndpoint', '$ionicViewSwitcher', '$scope', '$http', '$ionicScrollDelegate', '$ionicHistory', '$state', '$stateParams', '$timeout', function(addinfo, localStorageService, $ionicLoading, $sce, ApiEndpoint, $ionicViewSwitcher, $scope, $http, $ionicScrollDelegate, $ionicHistory, $state, $stateParams, $timeout) {
		$ionicLoading.show({
			template: '加载中...'
		});
		$scope.uid = localStorage.getItem("uid");
		$scope.liveId = $stateParams.id;
		$scope.liveContent = {
			uid: localStorage.getItem("uid"),
			liveId: $stateParams.id,
		}
		$http.post(ApiEndpoint.url + '/home/getProgramContents', {
				uid: $scope.uid,
				id: $scope.liveId
			})
			.then(
				function(res) {
					$scope.items = res.data.data;
					$http.post(ApiEndpoint.url + '/home/getProgramInfos', {uid: $scope.uid,id: $scope.liveId}).then(
						function(res){
							if(res.data.data.ifSignUp == 0) {
								$state.go($stateParams.view2, {
									mainNav: $stateParams.mainNav,
									nav: $stateParams.nav,
									id: $stateParams.id
								});
							}
						}
					)
					angular.forEach($scope.items, function(data) {
						if(data.id == $stateParams.liveId){
							$scope.item = data;
							addinfo.setTitle($scope.item.title);
						}
					});
					$scope.visit_url = $sce.trustAsResourceUrl($scope.item.visitUrl);
					$("meta[name='keywords']").attr("content", $scope.item.cate_subject + "," + $scope.item.real_name + ",基因检测,精准医学,探基,直播");
					$scope.$evalAsync();
					$ionicLoading.hide();
				}
			);
		$scope._width = $(window).width();
		$scope._height = $(window).height();
		/*返回*/
		$scope.liveBack = function() {
			$state.go($stateParams.view2, {
				mainNav: $stateParams.mainNav,
				nav: $stateParams.nav,
				id: $stateParams.id
			});
			$ionicViewSwitcher.nextDirection("back");
		}
		/*判断是否显示关注注公众号*/
		if(!addinfo.isEmptyValue(localStorage.getItem("userwx"))) {
			$scope.TJweixinShow = true;
		} else {
			$scope.TJweixinShow = false;
		}
		// 百度统计
		addinfo.baiduCount();
	}])
	/*END直播页js********************************************************************/
