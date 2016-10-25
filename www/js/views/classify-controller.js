starterCtrls
	.controller('ClassifyController', ['$scope','$state',function($scope, $state) {
		$scope.closeClassify = function() {
			$state.go("tabs.home");
		}
	}])
	/*看大会*/
	.controller('watchCtrl',['$scope', function($scope) {
		if(localStorage.getItem("navItems1")){
			$scope.navItems1 = JSON.parse(localStorage.getItem("navItems1"));
		}else{
			$scope.navItems1 = [
				{id: 0,name: "看大会",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}, 
				{id: 4,name: "基因检测",selected: false}, 
				{id: 5,name: "转基因",selected: false}, 
				{id: 6,name: "六字类目名称",selected: false}, 
				{id: 7,name: "二字",selected: false}, 
				{id: 8,name: "三字名",selected: false}, 
				{id: 9,name: "English Name",selected: false}, 
				{id: 10,name: "三字名",selected: false}, 
				{id: 11,name: "五字类目",selected: false}, 
				{id: 12,name: "二字",selected: false}, 
				{id: 13,name: "三字名",selected: false}
			];
		}
		
		localStorage.setItem("watch", JSON.stringify($scope.navItems1) );
		$scope.navItemActived = function(index) {
			if(index > 3) {
				
				$scope.navItems1[index].selected = !$scope.navItems1[index].selected;
				localStorage.setItem("navItems1", JSON.stringify($scope.navItems1) );
			}
			$scope.watch = [];
			var len = $scope.navItems1.length;
			for(var i=0;i<len;i++){
				if($scope.navItems1[i].selected == true){
					$scope.watch.push($scope.navItems1[i]);
				}
			}
			localStorage.setItem("watch", JSON.stringify($scope.watch) );
		}
		
//		if(localStorage.getItem("navItems1")) {
//			$scope.navItems1 = JSON.parse(localStorage.getItem("navItems1"));
//		} else {
//			$scope.navItems1 = [
//				{id: 0,name: "看大会",selected: true},
//				{id: 1,name: "基因组",selected: true}, 
//				{id: 2,name: "癌症",selected: true}, 
//				{id: 3,name: "单细胞",selected: true}, 
//				{id: 4,name: "基因检测",selected: false}, 
//				{id: 5,name: "转基因",selected: false}, 
//				{id: 6,name: "六字类目名称",selected: false}, 
//				{id: 7,name: "二字",selected: false}, 
//				{id: 8,name: "三字名",selected: false}, 
//				{id: 9,name: "English Name",selected: false}, 
//				{id: 10,name: "三字名",selected: false}, 
//				{id: 11,name: "五字类目",selected: false}, 
//				{id: 12,name: "二字",selected: false}, 
//				{id: 13,name: "三字名",selected: false}
//			];
//		}
//		$scope.watchIndex = [0, 1, 2, 3];
//		$scope.watch = [];
//		for(var i = 0; i < $scope.watchIndex.length; i++) {
//			$scope.watch.push($scope.navItems1[$scope.watchIndex[i]]);
//		}
//		localStorage.setItem("watch", JSON.stringify($scope.watch));
//		$scope.navItemActived = function(index) {
//			if(index > 3) {
//				$scope.navItems1[index].selected = !$scope.navItems1[index].selected;
//				localStorage.setItem("navItems1", JSON.stringify($scope.navItems1));
//				function des(a, b) {
//					return a - b;
//				}
//				function indexOf(val) {
//					for(var i = 0; i < $scope.watchIndex.length; i++) {
//						if($scope.watchIndex[i] == val) return i;
//					}
//				}
//				if($scope.navItems1[index].selected == true) {
//					$scope.watchIndex.push(index);
//					$scope.watchIndex = $scope.watchIndex.sort(des);
//				} else {
//					$scope.watchIndex = $scope.watchIndex.sort(des);
//					$scope.watchIndex.splice(indexOf(index), 1)
//				}
//				var len = $scope.watchIndex.length;
//				$scope.watch = [];
//				for(var i = 0; i < len; i++) {
//					$scope.watch.push($scope.navItems1[$scope.watchIndex[i]]);
//				}
//				localStorage.setItem("watch", JSON.stringify($scope.watch));
//			}
//		}
	}])
	/*学知识*/
	.controller('learnCtrl',['$scope', function($scope) {
		if(localStorage.getItem("navItems2")){
			$scope.navItems2 = JSON.parse(localStorage.getItem("navItems2"));
		}else{
			$scope.navItems2 = [
				{id: 0,name: "学知识",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}, 
				{id: 4,name: "基因检测",selected: false}, 
				{id: 5,name: "转基因",selected: false}, 
				{id: 6,name: "六字类目名称",selected: false}, 
				{id: 7,name: "二字",selected: false}, 
				{id: 8,name: "三字名",selected: false}, 
				{id: 9,name: "English Name",selected: false}, 
				{id: 10,name: "三字名",selected: false}, 
				{id: 11,name: "五字类目",selected: false}, 
				{id: 12,name: "二字",selected: false}, 
				{id: 13,name: "三字名",selected: false}
			];
		}
		
		localStorage.setItem("learn", JSON.stringify($scope.navItems2) );
		$scope.navItemActived = function(index) {
			if(index > 3) {
				
				$scope.navItems2[index].selected = !$scope.navItems2[index].selected;
				localStorage.setItem("navItems2", JSON.stringify($scope.navItems2) );
			}
			$scope.learn = [];
			var len = $scope.navItems2.length;
			for(var i=0;i<len;i++){
				if($scope.navItems2[i].selected == true){
					$scope.learn.push($scope.navItems2[i]);
				}
			}
			localStorage.setItem("learn", JSON.stringify($scope.learn) );
		}
	}])
	/*大咖说*/
	.controller('sayCtrl', ['$scope',function($scope) {
		if(localStorage.getItem("navItems3")){
			$scope.navItems3 = JSON.parse(localStorage.getItem("navItems3"));
		}else{
			$scope.navItems3 = [
				{id: 0,name: "看大会",selected: true},
				{id: 1,name: "基因组",selected: true}, 
				{id: 2,name: "癌症",selected: true}, 
				{id: 3,name: "单细胞",selected: true}, 
				{id: 4,name: "基因检测",selected: false}, 
				{id: 5,name: "转基因",selected: false}, 
				{id: 6,name: "六字类目名称",selected: false}, 
				{id: 7,name: "二字",selected: false}, 
				{id: 8,name: "三字名",selected: false}, 
				{id: 9,name: "English Name",selected: false}, 
				{id: 10,name: "三字名",selected: false}, 
				{id: 11,name: "五字类目",selected: false}, 
				{id: 12,name: "二字",selected: false}, 
				{id: 13,name: "三字名",selected: false}
			];
		}
		
		localStorage.setItem("say", JSON.stringify($scope.navItems3) );
		$scope.navItemActived = function(index) {
			if(index > 3) {
				
				$scope.navItems3[index].selected = !$scope.navItems3[index].selected;
				localStorage.setItem("navItems3", JSON.stringify($scope.navItems3) );
			}
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