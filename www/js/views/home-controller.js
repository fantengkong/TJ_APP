starterCtrls
	.controller('HomeController', function($state,$ionicModal, $scope, $ionicScrollDelegate, $http, $timeout) {
		$scope.openClassify = function(){
			$state.go("classify",{},{reload:true});
		}
		$scope.scrollTop = function() {
			$ionicScrollDelegate.scrollTop(true);
			$(".scrollToTop").hide();
		};

		$scope.getPos = function() {
			var d_top = $ionicScrollDelegate.$getByHandle('h_content').getScrollPosition().top;
			if(d_top > 10) {
				$(".scrollToTop").show();
			} else {
				$(".scrollToTop").hide();

			}
		}
		$scope.houzhui= {};
		$scope.items = {};
		$http.get('./mock/home_list.json')
			.then(
				function(res) {
					console.log(res.data)
					$scope.items = res.data;
				}
			);
//		$http({
//			
//		})
		/*
		$http（{  
			method:string,//就是请求方式get、post等  
			url:string ,//向服务器请求的地址  
			params:object,//携带的参数  
			data:string or obj,//发送的数据  
			heaers:obj,//设置头部  
			cache:bool,//是否缓存  
			timeout:number,//设置超时时间，在这段时间内没有响应，自动响应错误error这个函数  
			//还有其他参数，常用的就上面这些  
		}）.success().error()   
		 * */
		$scope.loadMore = function() {

			$http.get('./mock/home_more-item.json').success(function(items) {
				$scope.items = $scope.items.concat(items);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			})

		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			console.log("load complete");
		})
		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function($event) {
			$scope.modal.show($event);
			$(".c_choice a").on("click", function() {
				if($(this).hasClass("active")) {
					$(this).removeClass("active");
				} else {
					$(this).addClass("active");
				}

			})
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		//当我们用到模型时，清除它！
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// 当隐藏的模型时执行动作
		$scope.$on('modal.hide', function() {
			// 执行动作
		});
		// 当移动模型时执行动作
		$scope.$on('modal.removed', function() {
			// 执行动作
		});

	})
	.controller('subnavController', function($ionicModal, $scope, $ionicScrollDelegate, $http, $timeout) {
		$(".h_subnav button").on("click", function() {
			$(this).addClass("active").siblings().removeClass("active");
		})

	})