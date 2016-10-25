starterCtrls
	.controller('HomeController', ['$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', function($state, $scope, $ionicScrollDelegate, $http, $timeout) {
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
		
		
		if(!JSON.parse( localStorage.getItem("watch") )){
			$scope.navItems1 = [
				{id: 0,name: "看大会",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems1=JSON.parse( localStorage.getItem("watch") );			
		}
		
		if(!JSON.parse( localStorage.getItem("learn") )){
			$scope.navItems2 = [
				{id: 0,name: "学知识",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems2=JSON.parse( localStorage.getItem("learn") );
		}
		if(!JSON.parse( localStorage.getItem("say") )){
			$scope.navItems3 = [
				{id: 0,name: "大咖说",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems3=JSON.parse( localStorage.getItem("say") );
		}
		//点击按钮操作
		$scope.navItemAction = function(index){
    	$scope.activeNavItem = index;
    	console.log($scope.activeNavItem)
    	//点击切换页面
/*    	$http.get('./api/home_list.php?pageNo='+$scope.navItems1[index].id)
			.then(
				function(res) {
					$scope.items = res.data;
				}
			);*/
  	}
	}]);
	