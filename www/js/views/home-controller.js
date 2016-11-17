starterCtrls
	.controller('HomeController', ['$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', function($state, $scope, $ionicScrollDelegate, $http, $timeout) {
		/*回到顶部*/
		$scope.scrollTop = function() {
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
			$(".scrollToTop").hide();
		};
		/*回到顶部按钮显示消失*/
		$scope.d_top=0;
		$scope.getPos = function() {
			$scope.d_top = parseInt($ionicScrollDelegate.$getByHandle('h_content').getScrollPosition().top);
			if($scope.d_top > 10) {
				$(".scrollToTop").show();
			} else {
				$(".scrollToTop").hide();
			}
		}
		
		/*获取假数据*/	
		$scope.items1 = [];
		$scope.items2 = [];
		$scope.items3 = []; 
		$http.get('./mock/home/home_list.json')
			.then(
				function(res) {
					$scope.datas = res.data.slice(0,29);
					for(var i=0;i<$scope.datas.length;i++){
						if($scope.datas[i].data=="看大会"){
							$scope.items1.push($scope.datas[i]);	
						}else if($scope.datas[i].data=="学知识"){
							$scope.items2.push($scope.datas[i]);
						}else if($scope.datas[i].data=="大咖说"){
							$scope.items3.push($scope.datas[i]);
						}
					}
				}
				
			);	
		/*保存数据*/	
		$scope.items11=	$scope.items1;
		$scope.items22=	$scope.items2;
		$scope.items33=	$scope.items3;	
	}])
	.controller('home_learnCtrl', ['$ionicViewSwitcher' ,'$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', '$stateParams', function($ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout, $stateParams) {
		console.log($stateParams);
		$scope.openLearnClassify = function(){
			$state.go("classify.learn",{},{reload:true});
		}

		if(!JSON.parse( localStorage.getItem("learn") )){
			$scope.navItems2 = [
				{id: 0,name: "学知识",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems2=[];
			$scope.learn=JSON.parse( localStorage.getItem("learn") );
			for(var i=0;i<$scope.learn.length;i++){
				if($scope.learn[i].selected == true){
					$scope.navItems2.push($scope.learn[i]);
				}
			}
		}
		/*初始默认推荐按钮*/
		$scope.activeNavLearn = -1;
		/*判断是否有保存的锚点:二级导航*/
		if($stateParams.nav || $stateParams.nav==0 ){
			$scope.activeNavLearn = $stateParams.nav;
		}
		if($scope.activeNavLearn == -1){
			$scope.isActive2 = true;
		}
		/*判断是否有保存的锚点:跳转位置*/
		if($stateParams.position||$stateParams.position == 0){
			$timeout(function(){
				$ionicScrollDelegate.$getByHandle('h_content').scrollTo(0, $stateParams.position,[true])
			},0)
		}
		/*学知识跳转到直播简介页*/
		$scope.learn_to_liveprofile = function(index){
			$state.go('liveprofile',{liveprofileId:index,view:'tabs.home.learn',nav:$scope.activeNavLearn,position:$scope.d_top});
    	$ionicViewSwitcher.nextDirection("forward");
			
		}

		/*点击学知识推荐*/
		$scope.learnRecommend = function(){
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
			//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {					
					$scope.items2=$scope.items22;
					$scope.activeNavLearn = -1;
					$scope.isActive2 = true;
					$scope.num2 = 0;
		    	$scope.learnDataLoad = true;
				}
			);
		}
		//点击二级导航按钮加载数据
		$scope.navLearn = function(index){
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
    	//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {
					$scope.item2=$scope.items22[(index%10)].id;
					$scope.items2=[];
					$scope.items2.push(res.data[$scope.item2]);
					
					$scope.activeNavLearn = index;
		    	$scope.isActive2 = false;
		    	$scope.num2 = 0;
		    	$scope.learnDataLoad = true;
				}
			);
		}
		/*上拉加载更多*/
			/*每次加载的行数*/
			$scope.num2 = 0;
			/*是否加载*/
			$scope.learnDataLoad = true;
		$scope.loadMore = function() {
			if(!$("ion-infinite-scroll i").html()){
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color","#b0aba8");
			}
			$timeout(function(){
				$http.get('./mock/home_more-item.json').success(function(items) {
					/*总加载次数*/
					$scope.time = Math.ceil(items.length/10);
					if($scope.num2 == $scope.time){
							$scope.learnDataLoad = false;
					}else{
						$scope.learnDataLoad = true;
					}
					$scope.items2 = $scope.items2.concat(items.slice( (0+$scope.num2*20) , (9+$scope.num2*20) ) );
					$scope.num2++;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			},1000)
			
				
		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			$scope.loadMore();
		});
		
		
		
	}])
	.controller('home_watchCtrl', ['$ionicViewSwitcher' ,'$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout', '$stateParams', function($ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout,$stateParams) {
		$scope.watchDataLoad = false;
		
		/*打开看大会分类页*/
		$scope.openWatchClassify = function(){
			$state.go("classify.watch",{},{reload:true});
		}
		
		/*判断本地存储*/
		if(!JSON.parse( localStorage.getItem("watch") )){
			$scope.navItems1 = [
				{id: 0,name: "看大会",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems1=[];
			$scope.watch=JSON.parse( localStorage.getItem("watch") );
			for(var i=0;i<$scope.watch.length;i++){
				if($scope.watch[i].selected == true){
					$scope.navItems1.push($scope.watch[i]);
				}
			}
		}
		
		
		/*初始默认推荐按钮*/
		$scope.activeNavWatch = -1;
		/*判断是否有保存的锚点:二级导航*/
		if($stateParams.nav || $stateParams.nav==0 ){
			$scope.activeNavWatch = $stateParams.nav;
		}
		if($scope.activeNavWatch == -1){
			$scope.isActive1 = true;
		}
		/*跳转位置*/
		
		/*判断是否有保存的锚点:跳转位置*/
		if($stateParams.position||$stateParams.position == 0){
			$timeout(function(){
				$ionicScrollDelegate.$getByHandle('h_content').scrollTo(0, $stateParams.position,[true])
			},0)
		}
		$scope.getPos = function() {
			$timeout(function(){
        $scope.d_top = parseInt($ionicScrollDelegate.$getByHandle('h_content').getScrollPosition().top);
      }, 1000);  
			
			if($scope.d_top > 10) {
				$(".scrollToTop").show();
			} else {
				$(".scrollToTop").hide();
			}
		}
		
		$scope.watch_to_liveprofile = function(index){
			$state.go('liveprofile',{liveprofileId:index,view:'tabs.home.watch',nav:$scope.activeNavWatch,position:$scope.d_top});
    	$ionicViewSwitcher.nextDirection("forward");
			
		}
		
		/*点击看大会推荐*/
		$scope.watchRecommend = function(){
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
			$scope.activeNavWatch = -1;
			$scope.isActive1 = true;
    	$scope.num1 = 0;
    	$scope.watchDataLoad = true;
			//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {					
					$scope.items1=$scope.items11;
				}
			);
		}
		
		//点击二级导航按钮加载数据
		$scope.navWatch = function(index){
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop();
    	$scope.activeNavWatch = index;
    	$scope.isActive1 = false;
    	$scope.num1 = 0;
    	//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {
					$scope.item1=$scope.items11[(index%10)].id;
					$scope.items1=[];
					$scope.items1.push(res.data[$scope.item1]);
				}
			);
		}
		
		/*上拉加载更多*/
		/*每次加载的行数*/
		$scope.num1 = 0;
		/*是否加载*/
		$scope.watchDataLoad = true;
		$scope.loadMore = function() {
			if(!$("ion-infinite-scroll i").html()){
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color","#b0aba8");
			}
			$timeout(function(){
				$http.get('./mock/home_more-item.json').success(function(items) {
					/*总加载次数*/
					$scope.time = Math.ceil(items.length/10);
					if($scope.num1 == $scope.time){
							$scope.watchDataLoad = false;
					}else{
						$scope.watchDataLoad = true;
					}
					$scope.items1 = $scope.items1.concat(items.slice( (0+$scope.num1*10) , (9+$scope.num1*10) ) );
					$scope.num1++;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			},1000)
				
		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			$scope.loadMore();
		});
	}])
	.controller('home_sayCtrl', ['$ionicViewSwitcher' ,'$state', '$scope', '$ionicScrollDelegate', '$http', '$timeout','$stateParams' , function($ionicViewSwitcher, $state, $scope, $ionicScrollDelegate, $http, $timeout, $stateParams) {
		
		$scope.openSayClassify = function(){
			$state.go("classify.say",{},{reload:true});
		}
		
		if(!JSON.parse( localStorage.getItem("say") )){
			$scope.navItems3 = [
				{id: 0,name: "大咖说",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}
			];
		}else{
			$scope.navItems3=[];
			$scope.say=JSON.parse( localStorage.getItem("say") );
			for(var i=0;i<$scope.say.length;i++){
				if($scope.say[i].selected == true){
					$scope.navItems3.push($scope.say[i]);
				}
			}
		}
		/*初始默认推荐按钮*/
		/*初始默认推荐按钮*/
		$scope.activeNavSay = -1;
		/*判断是否有保存的锚点:二级导航*/
		if($stateParams.nav || $stateParams.nav==0 ){
			$scope.activeNavSay = $stateParams.nav;
		}
		if($scope.activeNavSay == -1){
			$scope.isActive3 = true;
		}
		/*判断是否有保存的锚点:跳转位置*/
		if($stateParams.position||$stateParams.position == 0){
			$timeout(function(){
				$ionicScrollDelegate.$getByHandle('h_content').scrollTo(0, $stateParams.position,[true]);
			},0)
		}
		/*跳转位置*/
		$scope.getPos = function() {
			$timeout(function(){
        $scope.d_top = parseInt($ionicScrollDelegate.$getByHandle('h_content').getScrollPosition().top);
      }, 1000);
			if($scope.d_top > 10) {
				$(".scrollToTop").show();
			} else {
				$(".scrollToTop").hide();
			}
		}
		/*大咖说跳转到直播简介页*/
		$scope.say_to_liveprofile = function(index){
			$state.go('liveprofile',{liveprofileId:index,view:'tabs.home.say',nav:$scope.activeNavSay,position:$scope.d_top});
    	$ionicViewSwitcher.nextDirection("forward");
			
		}
		
		/*点击看大会推荐*/
		$scope.sayRecommend = function(){
			$scope.activeNavSay = -1;
			$scope.isActive3 = true;
    	$scope.num3 = 0;
    	$scope.sayDataLoad = true;
			//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {					
					$scope.items3=$scope.items33;
				}
			);
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
		}
		//点击二级导航按钮加载数据
		$scope.navSay = function(index){
    	$scope.activeNavSay = index;
    	$scope.isActive3 = false;
    	$scope.num3 = 0;
    	$scope.sayDataLoad = true;
    	//点击加载数据
    	$http.get('./mock/home/home_list.json')
			.then(
				function(res) {
					$scope.item3=$scope.items33[(index%10)].id;
					$scope.items3=[];
					$scope.items3.push(res.data[$scope.item3]);
				}
			);
			$ionicScrollDelegate.$getByHandle('h_content').scrollTop(true);
		}
		/*上拉加载更多*/
			/*每次加载的行数*/
			$scope.num3 = 0;
			/*是否加载*/
			$scope.sayDataLoad = true;
		$scope.loadMore = function() {
			if(!$("ion-infinite-scroll i").html()){
				$("ion-infinite-scroll").prepend("<i>向上滑动，加载更多</i>").css("color","#b0aba8");
			}
			$timeout(function(){
				$http.get('./mock/home_more-item.json').success(function(items) {
					/*总加载次数*/
					$scope.time = Math.ceil(items.length/10);
					if($scope.num3 == $scope.time){
							$scope.sayDataLoad = false;
					}else{
						$scope.sayDataLoad = true;
					}
					$scope.items3 = $scope.items3.concat(items.slice( (0+$scope.num3*10) , (9+$scope.num3*10) ) );
					$scope.num3++;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			},1000)
				
		};
		$scope.$on('scroll.inifiteScrollComplete', function() {
			$scope.loadMore();
		});
	}]);
	