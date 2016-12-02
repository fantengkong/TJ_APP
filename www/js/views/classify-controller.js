starterCtrls
	.controller('ClassifyController', ['$http', '$scope',function($http, $scope) {
		$scope.navItems1=[];
		$scope.navItems2=[];
		$scope.navItems3=[];
		
		$http.get('./mock/home/home_classify.json')
			.then(
				function(res) {
					for(var i=0;i<res.data.cate.length;i++){
						if(res.data.cate[i].title=="学知识"){
							$scope.navItems2=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems2.length;j++){
									$scope.navItems2[j].selected = true;
							}
							localStorage.setItem("learn", JSON.stringify($scope.navItems2) );
						}else if(res.data.cate[i].title=="看大会"){
							$scope.navItems1=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems1.length;j++){
									$scope.navItems1[j].selected = true;
							}
							localStorage.setItem("watch", JSON.stringify($scope.navItems1) );
							
						}else if(res.data.cate[i].title=="大咖说"){
							$scope.navItems3=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems3.length;j++){
									$scope.navItems3[j].selected = true;
							}
							localStorage.setItem("say", JSON.stringify($scope.navItems3) );
						}
					}
				}
			);	
	}])
	/*看大会*/
	.controller('watchCtrl',['ApiEndpoint', '$http', '$scope', '$state', function(ApiEndpoint, $http, $scope, $state) {
		/*跳转到首页*/
		$scope.closeWatch = function() {
			$state.go("tabs.home.watch",{}, {reload: true});
			if(localStorage.getItem("uid")){
				$scope.Llearn=JSON.parse(localStorage.getItem("watch"));
				$http.post(ApiEndpoint.url+'/home/saveRadioCates',{uid:localStorage.getItem("uid"),cates:$scope.Llearn}).then()
			}
		}
		/*滑动切换*/
		$scope.onSwipeLeft = function() {
        $state.go("classify.say");
    };
    $scope.onSwipeRight = function() {
        $state.go("classify.learn");
    };
		/*判断本地存储*/
		if(!localStorage.getItem("navItems1")){
			$http.get('./mock/home/home_classify.json')
			.then(
				function(res) {
					for(var i=0;i<res.data.cate.length;i++){
						if(res.data.cate[i].title=="看大会"){
							$scope.navItems1=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems1.length;j++){
									$scope.navItems1[j].selected = true;
							}
						}
					}
				}
			);
		}else{
			$scope.navItems1 = JSON.parse(localStorage.getItem("navItems1"));
		}		
		

		/*点击选中*/
		$scope.navItemActived = function(index) {
			$scope.navItems1[index].selected = !$scope.navItems1[index].selected;
			localStorage.setItem("navItems1", JSON.stringify($scope.navItems1) );
			$scope.watch = [];
			var len = $scope.navItems1.length;
			for(var i=0;i<len;i++){
				if($scope.navItems1[i].selected == true){
					$scope.watch.push($scope.navItems1[i]);
				}
			}
			localStorage.setItem("watch", JSON.stringify($scope.watch) );
		}
	}])
	/*学知识*/
	.controller('learnCtrl',['ApiEndpoint', '$http', '$scope', '$state', function(ApiEndpoint, $http, $scope, $state) {
		
		/*跳转到首页*/
		$scope.closeLearn = function() {
			$state.go("tabs.home.learn",{}, {reload: true});
			if(localStorage.getItem("uid")){
				$scope.Llearn=JSON.parse(localStorage.getItem("learn"));
				$http.post(ApiEndpoint.url+'/home/saveRadioCates',{uid:localStorage.getItem("uid"),cates:$scope.Llearn}).then()
			}
		}
		/*滑动切换*/
		$scope.onSwipeLeft = function() {
        $state.go("classify.watch");
    };
    $scope.onSwipeRight = function() {
        $state.go("classify.say");
    };
    /*判断本地存储*/
   	
		if(!localStorage.getItem("navItems2")){
			$http.get('./mock/home/home_classify.json')
			.then(
				function(res) {
					for(var i=0;i<res.data.cate.length;i++){
						if(res.data.cate[i].title=="学知识"){
							$scope.navItems2=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems2.length;j++){
									$scope.navItems2[j].selected = true;
							}
						}
					}
				}
			);
		}else{
			$scope.navItems2 = JSON.parse(localStorage.getItem("navItems2"));
		}
		localStorage.setItem("learn", JSON.stringify($scope.navItems2) );
		
		/*点击选中*/
		$scope.navItemActived = function(index) {
			console.log(index);
			$scope.learn = [];
			$scope.navItems2[index].selected = !$scope.navItems2[index].selected
			localStorage.setItem("navItems2", JSON.stringify($scope.navItems2) );
			var len = $scope.navItems2.length;
			console.log($scope.navItems2)
			for(var i=0;i<len;i++){
				if($scope.navItems2[i].selected == true){
					$scope.learn.push($scope.navItems2[i]);
				}
			}
			localStorage.setItem("learn", JSON.stringify($scope.learn) );
		}
	}])
	/*大咖说*/
	.controller('sayCtrl', ['ApiEndpoint', '$http', '$scope', '$state', function(ApiEndpoint, $http, $scope, $state) {
		
		/*跳转到首页*/
		$scope.closeSay = function() {
			$state.go("tabs.home.say",{}, {reload: true});
			if(localStorage.getItem("uid")){
				$scope.Llearn=JSON.parse(localStorage.getItem("say"));
				$http.post(ApiEndpoint.url+'/home/saveRadioCates',{uid:localStorage.getItem("uid"),cates:$scope.Llearn}).then()
			}
		}
		/*滑动切换*/
		$scope.onSwipeLeft = function() {
        $state.go("classify.learn");
    };
    $scope.onSwipeRight = function() {
        $state.go("classify.watch");
    };
    /*判断本地存储*/
		if(!localStorage.getItem("navItems3")){
			$http.get('./mock/home/home_classify.json')
			.then(
				function(res) {
					for(var i=0;i<res.data.cate.length;i++){
						if(res.data.cate[i].title=="大咖说"){
							$scope.navItems3=res.data.cate[i].son;
							for(var j=0;j<$scope.navItems3.length;j++){
									$scope.navItems3[j].selected = true;
							}
						}
					}
				}
			);	
		}else{
			$scope.navItems3 = JSON.parse(localStorage.getItem("navItems3"));
		}
		/*点击选中*/
		$scope.navItemActived = function(index) {
				$scope.navItems3[index].selected = !$scope.navItems3[index].selected;
				localStorage.setItem("navItems3", JSON.stringify($scope.navItems3) );
			$scope.say = [];
			var len = $scope.navItems3.length;
			for(var i=0;i<len;i++){
				if($scope.navItems3[i].selected == true){
					$scope.say.push($scope.navItems3[i]);
				}
			}
			localStorage.setItem("say", JSON.stringify($scope.say) );
		}
	}]);