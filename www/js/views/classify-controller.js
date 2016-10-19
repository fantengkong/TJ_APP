starterCtrls
	.controller('ClassifyController', function($scope, $state) {
		$scope.closeClassify = function() {
			$state.go("tabs.home");
		}
	})
	/*看大会*/
	.controller('watchCtrl', function($scope) {
		if(localStorage.getItem("navItems1")) {
			$scope.navItems1 = JSON.parse(localStorage.getItem("navItems1"));
		} else {
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
		$scope.watchIndex = [0, 1, 2, 3];
		$scope.watch = [];
		for(var i = 0; i < $scope.watchIndex.length; i++) {
			$scope.watch.push($scope.navItems1[$scope.watchIndex[i]]);
		}
		localStorage.setItem("watch", JSON.stringify($scope.watch));
		$scope.navItemActived = function(index) {
			if(index > 3) {
				$scope.navItems1[index].selected = !$scope.navItems1[index].selected;
				localStorage.setItem("navItems1", JSON.stringify($scope.navItems1));
				if($scope.navItems1[index].selected == true) {
					$scope.watchIndex.push(index);
				} else {
					function indexOf(val) {
						for(var i = 0; i < $scope.watchIndex.length; i++) {
							if($scope.watchIndex[i] == val) return i;
						}
					}
					$scope.watchIndex.splice(indexOf(index), 1)
				}
				function des(a, b) {
					return a - b;
				}
				$scope.watchIndex = $scope.watchIndex.sort(des);
				var len = $scope.watchIndex.length;
				$scope.watch = [];
				for(var i = 0; i < len; i++) {
					$scope.watch.push($scope.navItems1[$scope.watchIndex[i]]);
				}
				localStorage.setItem("watch", JSON.stringify($scope.watch));
			}
		}
	})
	/*学知识*/
	.controller('learnCtrl', function($scope) {
		if(localStorage.getItem("navItems2")) {
			$scope.navItems2 = JSON.parse(localStorage.getItem("navItems2"));
		} else {
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
		$scope.learnIndex = [0, 1, 2, 3];
		$scope.learn = [];
		for(var i = 0; i < $scope.learnIndex.length; i++) {
			$scope.learn.push($scope.navItems2[$scope.learnIndex[i]]);
		}
		localStorage.setItem("learn", JSON.stringify($scope.learn));
		$scope.navItemActived = function(index) {
			if(index > 3) {
				$scope.navItems2[index].selected = !$scope.navItems2[index].selected;
				localStorage.setItem("navItems2", JSON.stringify($scope.navItems2));
				if($scope.navItems2[index].selected == true) {
					$scope.learnIndex.push(index);
				} else {
					function indexOf(val) {
						for(var i = 0; i < $scope.learnIndex.length; i++) {
							if($scope.learnIndex[i] == val) return i;
						}
					}
					$scope.learnIndex.splice(indexOf(index), 1)
				}
				function des(a, b) {
					return a - b;
				}
				$scope.learnIndex = $scope.learnIndex.sort(des);
				var len = $scope.learnIndex.length;
				$scope.learn = [];
				for(var i = 0; i < len; i++) {
					$scope.learn.push($scope.navItems2[$scope.learnIndex[i]]);
				}
				localStorage.setItem("learn", JSON.stringify($scope.learn));
			}
		}
	})
	/*大咖说*/
	.controller('sayCtrl', function($scope) {
		if(localStorage.getItem("navItems3")) {
			$scope.navItems3 = JSON.parse(localStorage.getItem("navItems3"));
		} else {
			$scope.navItems3 = [
			  {id: 0,name: "大咖说",selected: true},
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
		$scope.sayIndex = [0, 1, 2, 3];
		$scope.say = [];
		for(var i = 0; i < $scope.sayIndex.length; i++) {
			$scope.say.push($scope.navItems3[$scope.sayIndex[i]]);
		}
		localStorage.setItem("say", JSON.stringify($scope.say));
		$scope.navItemActived = function(index) {
			if(index > 3) {
				$scope.navItems3[index].selected = !$scope.navItems3[index].selected;
				localStorage.setItem("navItems3", JSON.stringify($scope.navItems3));
				if($scope.navItems3[index].selected == true) {
					$scope.sayIndex.push(index);
				} else {
					function indexOf(val) {
						for(var i = 0; i < $scope.sayIndex.length; i++) {
							if($scope.sayIndex[i] == val) return i;
						}
					}
					$scope.sayIndex.splice(indexOf(index), 1)
				}
				function des(a, b) {
					return a - b;
				}
				$scope.sayIndex = $scope.sayIndex.sort(des);
				var len = $scope.sayIndex.length;
				$scope.say = [];
				for(var i = 0; i < len; i++) {
					$scope.say.push($scope.navItems3[$scope.sayIndex[i]]);
				}
				localStorage.setItem("say", JSON.stringify($scope.say));
			}
		}
	})