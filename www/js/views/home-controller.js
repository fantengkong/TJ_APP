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
		/*获取假数据*/
		$http.get('mock/home_list.json')
			.then(
				function(res) {
					$scope.items = res.data;
				}
			);
			
			
			/*从后台获取数据*/
/*		$http.get('./api/home_list.php?pageNo=0')
			.then(
				function(res) {
					$scope.items = res.data;
				}
			);*/

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
		$scope.activeNavItem = 0;
		$scope.navItemAction = function(index){
    	$scope.activeNavItem = index;
//  	$ionicScrollDelegate.$getByHandle('nav-content1').scrollTo(0,index*200,true);
    	$http.get('./api/home_list.php?pageNo='+index)
			.then(
				function(res) {
					$scope.items = res.data;
				}
			);
    }
		$scope.navItems1=[
			{ id: 0 ,name: "精品推荐"},
	    { id: 1 ,name: "基因组"},
	    { id: 2 ,name: "癌症" },
	    { id: 3 ,name: "单细胞" },
	    { id: 4 ,name: "基因检测" },
	    { id: 5 ,name: "转基因" },
	    { id: 6 ,name: "六字类目名称" },
	    { id: 7 ,name: "二字" },
	    { id: 8 ,name: "三字名" },
	    { id: 9 ,name: "English Name" },
	    { id: 10 ,name: "三字名" },
	    { id: 11 ,name: "五字类目" },
	    { id: 12 ,name: "二字" },
	    { id: 13 ,name: "三字名" }
		];
		$scope.navItems2=[
			{ id: 0 ,name: "精品推荐"},
	    { id: 1 ,name: "学知识"},
	    { id: 2 ,name: "癌症" },
	    { id: 3 ,name: "单细胞" },
	    { id: 4 ,name: "基因检测" },
	    { id: 5 ,name: "转基因" },
	    { id: 6 ,name: "六字类目名称" },
	    { id: 7 ,name: "二字" },
	    { id: 8 ,name: "三字名" },
	    { id: 9 ,name: "English Name" },
	    { id: 10 ,name: "三字名" },
	    { id: 11 ,name: "五字类目" },
	    { id: 12 ,name: "二字" },
	    { id: 13 ,name: "三字名" }
		];
		$scope.navItems3=[
			{ id: 0 ,name: "精品推荐"},
	    { id: 1 ,name: "大咖说"},
	    { id: 2 ,name: "癌症" },
	    { id: 3 ,name: "单细胞" },
	    { id: 4 ,name: "基因检测" },
	    { id: 5 ,name: "转基因" },
	    { id: 6 ,name: "六字类目名称" },
	    { id: 7 ,name: "二字" },
	    { id: 8 ,name: "三字名" },
	    { id: 9 ,name: "English Name" },
	    { id: 10 ,name: "三字名" },
	    { id: 11 ,name: "五字类目" },
	    { id: 12 ,name: "二字" },
	    { id: 13 ,name: "三字名" }
		];

	})
	