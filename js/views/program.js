starterCtrls
.controller('ProgramDetailsController', ['userService', '$ionicScrollDelegate', '$window', '$sce', 'localStorageService', '$log', '$ionicPopup', '$ionicLoading', 'ApiEndpoint', 'addinfo', '$ionicViewSwitcher', '$scope', '$state', '$stateParams', '$http', '$ionicHistory', '$timeout', function(userService, $ionicScrollDelegate, $window, $sce, localStorageService, $log, $ionicPopup, $ionicLoading, ApiEndpoint, addinfo, $ionicViewSwitcher, $scope, $state, $stateParams, $http, $ionicHistory, $timeout) {
/*1111111111111111111111111111111111111111111111111111111111111111111*/
		//遮罩层
		$ionicLoading.show({
			template: '加载中...'
		});
		//退出页面执行事件
		$scope.$on('$destroy', function() {
			$scope.pro.banPlayBack = false;
			$scope.pro.banVideo = false;
			if(!addinfo.isEmptyValue(localStorage.getItem("userwx"))){
				localStorage.setItem("userwx",'');
			}
		});
		
		//变量
		$scope.vActivedIndex = 0;
		$scope.pro = {
			//探基微信显示
			tj_wx : localStorage.getItem("userwx") ? true : false,
			//后退按钮显示
			proBack : true,
			//回到顶部
			proBackTop : false,
			//banner:
			//	1. ban显示 
			banPro : false,
			//	2. 封面 
			banImg : false,
			//	3. 播放 
			banPlay : false,
			//	4. 视频 
			banVideo : false,
			//	5. 直播预告 
			banPre : false,
			//  6. 直播回放
			banPlayBack : false,
	
			//count
			//	1. 人数显示 
			numPro : false,
			//	2. 报名人数 
			numEnroll : false,
			//	3. 点击量 
			numClick : false,
			//	4. 评论量 
			numComment : false,
	
			//讲师或会议between
			//	1. 讲师或会议显示 
			betPro : false,
			//	2. 单讲师 
			betLecturer : false,
			//	3. 多讲师 
			betLecturers : false,
			//	4. 会议 
			betMetting : false,
	
			//video
			//	1. 视频集显示 
			proVid : false,
			//	2. 视频选集 
			vidOnDemand : false,
			//	3. 直播视频大纲 
			vidOutline : false,
			//	4. 直播视频选集 
			vidLive : false,
	
			//直播icon liveState
			//	1. 播放 
			lvPlay : false,
			//	2. 等待回放 
			lvWait : false,
			//	3. 等待时间 
			lvTime : false,
	
			//footer
			//	1. 底板显示
			botPro : false,
			//	2. 登录（报名看直播 ）
			botLogin : false,
			//	3. 报名看直播 
			botEnroll : false,
			//	4. 已报名 
			botEnrolled : false,
			//	5. 进入直播间 
			botEnter : false,
			//	6. 直播结束 
			botEnd : false,
	
			//选择视频
			vidselectItem : 0,
			selectItem : 1,
			//点播或回放的高度
			Vheight : $window.innerWidth / 1.5 < $window.innerHeight ? $window.innerWidth / 1.5 : $window.innerHeight,
			//点播视频vid
			pro_vid:{
				vid : ''
			},
			logo : parseInt($window.innerWidth / 100 *56),
			wxHeight : parseInt($window.innerWidth / 9),
			hasWx : {'top':parseInt($window.innerWidth / 100 *56) + 'px'},
			banHeight : {'height' : parseInt($window.innerWidth / 100 *56) + 'px'},
			//判断本地存储uid是否存在
			uid : localStorage.getItem("uid") ? localStorage.getItem("uid") : '',
			proId : $stateParams.id,
			//当前时间秒数
			myDate : new Date(),
			nowTime : Math.floor(new Date() / 1000),
			//群交流按钮显示
			groupBtnShow : true,
			GroupPos : {}
		};
		//群交流显示
		$scope.pro.groupShow = false;
		//群交流关闭
		$scope.pro.groupClose = false;
		//群交流按钮位置
		$scope.pro.groupPosition = '';
		//判断本地存储url
		$scope.hasUrl = localStorage.getItem("url") ? true : false;
		if($scope.hasUrl) {
			localStorageService.clear("url");
			//2.6报名接口
			$http.post(ApiEndpoint.url + '/home/programSignUp', {
				uid: $scope.pro.uid,
				id: $scope.pro.proId
			}).then(
				function(res) {
					$scope.proSignUps = (res.data.code == 200) ? res.data : false;
					if($scope.proSignUps.msg == "成功") {
						var myPopup = $ionicPopup.show({
							title: '<i class="icon iconfont">&#xe657;</i>',
							subTitle: '报名成功，开播会准时通知您哦',
							scope: $scope,
							buttons: []
						});
						myPopup.then(function(res) {
							location.reload();
						});
						$timeout(function() {
							myPopup.close();
						}, 2000);
					}
				}
			)
		}
/*222222222222222222222222接口-------------------------------------*/

	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	m = m<10 ? '0'+m : m;
	var d = time.getDate();
	d = d<10 ? '0'+d : d;
	var h = time.getHours();
	h = h<10 ? '0'+h : h;
	var mm = time.getMinutes();
	mm = mm < 10 ? '0'+mm : mm;
	/*2017.01.09 19:10*/
	$scope.nowDate = y+'.'+m+'.'+d+' '+h+':'+mm;

//$http.get("../../mock/program-details/4proLectureInfo.json").then(
		//2.1 加载基本信息
	userService.getUsers(ApiEndpoint.url + '/home/getProgramInfos', {uid: $scope.pro.uid,id: $scope.pro.proId}).then(function(successResponse){
//---------------------------------------------------------------------------------------
				/*1-1判断是否已下映*/
				if( addinfo.isEmptyValue(successResponse.data) ){
					/*1-1-1节目已下映*/
					$ionicLoading.show({
						template: '节目已下映'
					});
					$timeout(function() {
						$ionicLoading.hide();
						$state.go('tabs.home');
					}, 2000);
					return false;
				}
				/*1-1-2节目未下映*/
				//基本信息
				$scope.proBasicInfos = successResponse.data;
				console.log($scope.proBasicInfos);
				//改变title内容
				addinfo.setTitle($scope.proBasicInfos.title);
				//视频选集是否显示
				$scope.pro.proVid = $scope.proBasicInfos.contain != 1 ? true : false;
//---------------------------------------------------------------------------------------
				/*1-2判断是否为单点播：单点播无需报名*/
				if($scope.proBasicInfos.programType==1 || ($scope.proBasicInfos.programType==2 && $scope.proBasicInfos.contain==1) ){
					//人为设置报名成功
					$scope.pro.proVid = false;
				}
				if($scope.proBasicInfos.ifSignUp == 0){
					$scope.pro.botPro = true;
				}
					
					//ban,封面,讲师或会议 显示
					$scope.pro.banPro = true;$scope.pro.banImg = true;$scope.pro.betPro = true;
					//点播显示
					$scope.pro.banVideo = true;
					//是否显示会议
					$scope.pro.betMetting = !addinfo.isEmptyValue($scope.proBasicInfos.meeting) ? true : false;
					$scope.m_address = !addinfo.isEmptyValue($scope.proBasicInfos.meeting.address);
					$scope.m_time = !addinfo.isEmptyValue($scope.proBasicInfos.meeting.durationTime);
					//是否显示讲师：多或单
					$scope.pro.betLecturer = !$scope.pro.betMetting;
					$scope.pro.betLecturers = !$scope.pro.betMetting;
					//显示状态 : 预告
					var timer = setInterval(function() {
						if($scope.proBasicInfos.countDownTime > 0) {
							$scope.countDown = addinfo.formatSeconds($scope.proBasicInfos.countDownTime);
							//秒
							if($scope.countDown.second==undefined){
								$scope.countDown.second = $scope.proBasicInfos.countDownTime >= 10 ? $scope.proBasicInfos.countDownTime : '0'+$scope.proBasicInfos.countDownTime;
							}else{
								$scope.countDown.second = $scope.countDown.second >= 10 ? $scope.countDown.second : '0'+$scope.countDown.second;
							}
							//分
							$scope.countDown.min = $scope.countDown.min < 10 ? "0"+$scope.countDown.min : $scope.countDown.min;
							$scope.countDown.min = $scope.countDown.min != undefined ? $scope.countDown.min : '00';
							//时
							$scope.countDown.hour = $scope.countDown.hour < 10 ? "0"+$scope.countDown.hour : $scope.countDown.hour;
							$scope.countDown.hour = $scope.countDown.hour !=undefined ? $scope.countDown.hour : '00';
							//天
							$scope.countDown.day = $scope.countDown.day < 10 ? "0"+$scope.countDown.day : $scope.countDown.day;
							$scope.countDown.day = $scope.countDown.day >= 99 ? 99 : $scope.countDown.day;
							$scope.countDown.day = $scope.countDown.day != undefined ? $scope.countDown.day : '00';
							$scope.$evalAsync();
							--$scope.proBasicInfos.countDownTime;
						} else {
							clearInterval(timer);
							if($scope.proBasicInfos.countDownTime == 0&&!addinfo.isEmptyValue($scope.proBasicInfos.countDownTime)){
								location.reload();
							}
							if(($scope.proBasicInfos.programType==1)&&$scope.proBasicInfos.countDownTime == 0){
								$scope.pro.banPlay = true;
							}
							$scope.pro.banPre = false;
							$scope.$evalAsync();
						}
					}, 1000);
					//预告是否显示
					$scope.pro.banPre = ($scope.proBasicInfos.type == 1) && $scope.proBasicInfos.countDownTime > 0 ? true : false;
					
					//点播集显示
					$scope.pro.vidOnDemand = true;
					//未报名直播集
//---------------------------------------------------------------------------------------
				/*1-3判断是否为单直播：单直播有底部报名栏*/
					if( $scope.proBasicInfos.contain == 1 && $scope.proBasicInfos.programType == 2) {
						//uid不存在
						$scope.pro.botLogin = !addinfo.isEmptyValue($scope.pro.uid) ? false : true;
						//uid存在 ifSignUp==0 
						$scope.pro.botEnroll = $scope.proBasicInfos.ifSignUp == 0 && !addinfo.isEmptyValue($scope.pro.uid) ? true : false;
						//uid存在 ifSignUp==1 时间未到 已报名显示
						$scope.pro.botEnrolled = ($scope.proBasicInfos.ifSignUp == 1) && !addinfo.isEmptyValue($scope.pro.uid) && $scope.proBasicInfos.type == 1? true : false;
						//uid存在 ifSignUp==1 时间到了 进入直播间显示
						$scope.pro.botEnter = ($scope.proBasicInfos.ifSignUp == 1) && !addinfo.isEmptyValue($scope.pro.uid) && $scope.proBasicInfos.type == 2 ? true : false;
						//直播结束
						$scope.pro.botEnd = $scope.proBasicInfos.type==3 && $scope.proBasicInfos.ifSignUp == 1 && !addinfo.isEmptyValue($scope.pro.uid) ? true : false;
					} else if($scope.proBasicInfos.programType == 2 && $scope.proBasicInfos.contain != 1) {

						//uid不存在
						$scope.pro.botLogin = !addinfo.isEmptyValue($scope.pro.uid) ? false : true;
						//uid存在 ifSignUp==0 
						$scope.pro.botEnroll = $scope.proBasicInfos.ifSignUp == 0 && !addinfo.isEmptyValue($scope.pro.uid) ? true : false;
						
					}
					//底部显示
					$scope.pro.botPro = ( $scope.proBasicInfos.contain == 1 && $scope.proBasicInfos.programType == 2 ) ? true : false;
//---------------------------------------------------------------------------------------
				/*1-4判断是否有讲师*/	
					//2.4获取讲师
					if(!$scope.pro.betMetting) {
						$http.post(ApiEndpoint.url + '/home/getProgramHosts', {id: $scope.pro.proId}).then(
							function(res) {
								//讲师数据
								$scope.proHostInfos = (res.data.code == 200) ? res.data.data : '';
								//单讲师显示
								$scope.pro.betLecturer = ($scope.proHostInfos.type == 1) ? true : false;
								$scope.pro.betLecturers = ($scope.proHostInfos.type == 2) ? true : false;
								//单讲师数据
								$scope.lecturer = !addinfo.isEmptyValue($scope.proHostInfos) ? $scope.proHostInfos.datas[0] : '';
								//讲师数据显示
								$scope.pro.betPro = addinfo.isEmptyValue($scope.proHostInfos) ? false : true;
							}
						)
					}
					//2.5节目内容信息获取接口(点播，多点播，直播，多直播)
					$http.post(ApiEndpoint.url + '/home/getProgramContents', {uid: $scope.pro.uid,id: $scope.pro.proId}).then(
						function(res) {
							//视频数据
							$scope.proContentInfos = (res.data.code == 200) ? res.data.data : '';
							$ionicLoading.hide();
							//是否显示多点播
//							$scope.pro.vidOnDemand = ($scope.proContentInfos.type == 2) ? true : false;
							$scope.pro.vidOnDemand = false;
							//点播数据
							$scope.multiVid = $scope.proBasicInfos.contain != 1 ? $scope.proContentInfos : '';
							$scope.pro.selectItem = !addinfo.isEmptyValue($scope.multiVid) ? $scope.multiVid[0].id : 0;
							//点播数量
							$scope.numMultiVid = $scope.proBasicInfos.contain;
							//点播vid
							$scope.pro.pro_vid.vid = !addinfo.isEmptyValue($scope.multiVid) ? $scope.multiVid[0].vid : '';
							//播放按钮:单直播
							$scope.pro.banPlay = true;
							if( $scope.proBasicInfos.contain == 1 && $scope.proBasicInfos.programType == 2 ){
								$scope.pro.banPlay = false;
								if( $scope.proContentInfos[0].status==5 && $scope.proBasicInfos.ifSignUp == 1 ){
									$scope.pro.banPlay = true;
								}
							}
							//直播数据:多点播+多直播
							$scope.multiLive = $scope.proContentInfos ;
							if($scope.proBasicInfos.programType == 2 && $scope.proBasicInfos.contain != 1) {
								angular.forEach($scope.multiLive, function(data) {
									if(data.ctype==2){
										if(data.status != 5 && data.status != 2){
											$scope.pro.banPlay = false;
										}
										if( $scope.proBasicInfos.ifSignUp == 0 ) {
											$scope.pro.banPlay = false;
										}
									}
								});
							}
							
							$scope.backIndex = 999;
							$scope.liveIndex = 999;
							$scope.playIndex = 999;
							if( $scope.proBasicInfos.contain != 1 ) {
								angular.forEach($scope.proContentInfos, function(data,index,array) {
									if($scope.liveIndex==999&&data.ctype==2&&data.status==2){
										$scope.liveIndex = index;
									}
									if($scope.backIndex==999&&data.ctype==2&&data.status==5){
										$scope.backIndex = index;
									}
									if($scope.playIndex==999&&data.ctype==1&&data.startTime<$scope.nowDate){
										$scope.playIndex = index;
									}
								});
								if($scope.liveIndex < $scope.backIndex){
									$scope.proIndex = $scope.liveIndex;
								}else{
									$scope.proIndex = $scope.backIndex;
								}
								if($scope.proIndex > $scope.playIndex){
									$scope.proIndex = $scope.playIndex;
								}
								$scope.vActivedIndex = $scope.proIndex;
								$scope.vActived = $scope.proContentInfos[$scope.proIndex].id;
							}
							//单直播 
							if( $scope.proBasicInfos.contain == 1 && $scope.proBasicInfos.programType == 2 && ( $scope.proContentInfos[0].status == 5 && $scope.proContentInfos[0].status==2 ) ) {
								$scope.vActived = $scope.proContentInfos[0].id
								$scope.vActivedIndex = 0;
							}
							//单点播
							if( $scope.proBasicInfos.contain == 1 && $scope.proBasicInfos.programType == 1) {
								$scope.vActived = $scope.proContentInfos[0].id
								$scope.vActivedIndex = 0;
							}
							//未报名直播集
							$scope.pro.vidOutline = ( $scope.proBasicInfos.contain != 1 ) && ($scope.proBasicInfos.ifSignUp == 0) ? true : false;
							//已报名直播集
							$scope.pro.vidLive = ( $scope.proBasicInfos.contain != 1 ) && ($scope.proBasicInfos.ifSignUp == 1) ? true : false;
							//直播数量
							$scope.numMultiLive = $scope.proBasicInfos.contain;
							if($scope.proBasicInfos.countDownTime>0){
								$scope.pro.banPlay = false;
							}
							//底部显示
							$scope.pro.botPro = ($scope.proBasicInfos.programType == 1) ? false : !$scope.pro.botLogin && !$scope.pro.botEnroll && !$scope.pro.botEnrolled && !$scope.pro.botEnter && !$scope.pro.botEnd ? false : true;
							
							//回放地址
							$scope.targetUrl = ( $scope.proBasicInfos.programType == 2 && ($scope.proContentInfos.contain == 1) && $scope.proContentInfos[0].recordUrl )? $sce.trustAsResourceUrl($scope.proContentInfos[0].recordUrl) : '';
							//直播或点播数据显示
							
							if($scope.pro.tj_wx == true) {
								$scope.pro.wxHeight = parseInt($window.innerWidth / 9);
								$scope.pro.hasWx = {
									'top': $scope.pro.wxHeight + $scope.pro.logo + 'px'
								};
								$scope.backTop = {
									"top": 10 + $scope.pro.wxHeight + 'px'
								};
								$scope.tjImgHeight = {
									"height": $scope.pro.wxHeight + 'px'
								};
							} else {
								$scope.pro.hasWx = {
									'top':  $scope.pro.logo + 'px'
								};
								$scope.backTop = {
									"top": "1rem"
								};
								$scope.tjImgHeight = {
									'top': 0
								};
							}
							
							$scope.pro.GroupPos = $scope.pro.proBackTop && $scope.pro.botPro ? {'bottom' : '11.2rem'} : !$scope.pro.proBackTop && $scope.pro.botPro ? {'bottom' : '6.5rem'} : $scope.pro.proBackTop && !$scope.pro.botPro ? {'bottom' : '6.2rem'} : {'bottom' : '1.5rem'};
							
						})
	});	
		
		//2.2获取类目和科目
//			$http.get("../../mock/program-details/2proCate.json").then(
		$http.post(ApiEndpoint.url + '/home/getProgramCates', {id: $scope.pro.proId}).then(
			function(res) {
				//类目和科目
				$scope.proCates = !addinfo.isEmptyValue(res.data.data) ? res.data.data : '';
				//主类目
				$scope.main_category = !addinfo.isEmptyValue($scope.proCates.fcate) ? $scope.proCates.fcate : "";
				//科目
				$scope.sub_category = $scope.proCates.subjects;
				//类目科目显示
				$scope.procate = addinfo.isEmptyValue($scope.proCates) ? false : true;
			}
		)

		//2.3报名或点击人数
//			$http.get("../../mock/program-details/3proPeoNum2.json").then(
		$http.post(ApiEndpoint.url + '/home/getProgramDatas', {id: $scope.pro.proId}).then(
			function(res) {
				//播放数据
				$scope.proPeoNums = (res.data.code == 200) ? res.data.data : false;
				//报名人数
				$scope.pro.numEnroll = ($scope.proPeoNums.type == 2) && ($scope.proPeoNums.signDatas.length >= 4) ? true : false;
				$scope.pro.numClick = ($scope.proPeoNums.type == 1) && $scope.proPeoNums.clickNum >= 7 ? true : false;
				//报名数据
				$scope.registered = $scope.pro.numEnroll ? ($scope.proPeoNums.signNum >= 7) ? $scope.proPeoNums.signDatas.slice(0, 7) : $scope.proPeoNums.signDatas : '';
				//播放数据显示
				$scope.pro.numPro = addinfo.isEmptyValue($scope.proPeoNums) ? false : true;
			}
		)

		//2.7访问记录接口
		//$http.get("../../mock/program-details/7proRecord.json").then(
		$scope.$on('$ionicView.afterEnter', function() {
			$http.post(ApiEndpoint.url + '/home/programSkinRecord', {uid: $scope.pro.uid,id: $scope.pro.proId,type: ''}).then(
				function(res) {}
			)
		},false);	
		//2.9群交流
		$http.post(ApiEndpoint.url + '/home/getProgramQrCode', {id: $scope.pro.proId}).then(
			function(res){
				if(res.data.code == 200){
					$scope.pro.groupData = res.data.data;
					if($scope.pro.groupData.qq_code == ''&&$scope.pro.groupData.weixin_code == ''){
						$scope.pro.groupBtnShow = false;
					}
				}else{
					$scope.pro.groupBtnShow = false;
				}
			}
		);
/*3333333333333333333333333333333事件------------------------------*/			
		//3.1 进入微信关注页：goToTJwx()
		$scope.goToTJwx = function() {
			$state.go("login_register", {
				nav: $stateParams.nav,
				mainNav: $stateParams.mainNav,
				view: 'programDetails',
				id: $scope.pro.proId
			});
		}

		//3.2. 关闭微信广告：closeWx()
		$scope.closeWx = function() {
			$scope.pro.tj_wx = false;
			$scope.pro.hasWx = {
				"top": 0
			};
			$scope.iscrollHeight = {
				'height': '' + $window.innerHeight - 50 + 'px'
			};
			$scope.backTop = {
				"top": "1rem"
			};
		}
		
		//3.3. 后退：proBackOff()
		$scope.proBackOff = function() {
			if($stateParams.mainNav=="tabs.my"){
				$state.go('tabs.my');
			}else{
				$state.go('tabs.home', {
					nav: $stateParams.nav,
					mainNav: $stateParams.mainNav
				});
			}
			$ionicViewSwitcher.nextDirection("back");
		}

		//3.4.滚动事件
		$scope.proContentScroll = function() {
			$scope.proContentPos = !addinfo.isEmptyValue($ionicScrollDelegate.$getByHandle('proMain').getScrollPosition()) ? $ionicScrollDelegate.$getByHandle('proMain').getScrollPosition() : '';
			$scope.proContentTop = !addinfo.isEmptyValue($scope.proContentPos) ? $scope.proContentPos.top : 0;
			$scope.pro.proBackTop = $scope.proContentTop >= 10 ? true : false;
			$scope.pro.GroupPos = $scope.pro.proBackTop && $scope.pro.botPro ? {'bottom' : '11.2rem'} : !$scope.pro.proBackTop && $scope.pro.botPro ? {'bottom' : '6.5rem'} : $scope.pro.proBackTop && !$scope.pro.botPro ? {'bottom' : '6.2rem'} : {'bottom' : '1.5rem'};
			$scope.$evalAsync();
		}

		//3.5. 回到顶部：proScrollTop() 
		$scope.proScrollTop = function() {
			$scope.pro.proBackTop = false;
			$ionicScrollDelegate.$getByHandle('proMain').scrollTop();
		}
		
		function userBehavior(vId,vIndex){
			$.getScript('http://pv.sohu.com/cityjson',function(){ 
				$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){ 
					$http.post(ApiEndpoint.url + '/home/getVisitorsAreaIp', {
						pid: $scope.pro.proId,
						cid: vId,
						ctype: $scope.proContentInfos[vIndex].ctype,
						uid: $scope.pro.uid,
						ip: returnCitySN.cip,
						country: remote_ip_info.country,
						province: remote_ip_info.province,
						city: remote_ip_info.city,
						address: remote_ip_info.desc
					})
					.then(function(res) {
					});
				});
			});
		}
		function proCount(vId){
			$http.post(ApiEndpoint.url + '/home/programSetStatistics', {
				id: $scope.pro.proId,
				cid: vId
			}).then(function(res) {
			})
		}
		
		//3.6. 播放视频：playVideo
		$scope.playVideo = function(vId,vIndex) {
			//用户点击行为
			userBehavior(vId,vIndex);
			proCount(vId);
			
			//替代图片删除
			$scope.pro.vidselectItem = 1;
			//播放按钮消除
			$scope.pro.banPlay = false;
			//封面图消除
			$scope.pro.banImg = false;
			angular.element(document.querySelector('.polyVid')).children().remove();
			$scope.pro.banHeight = $(window).width() / 1.5 < $(window).height() ? {
				"height": $scope.pro.Vheight + "px"
			} : {
				"height": $window.innerHeight + "px"
			};
			if($scope.pro.tj_wx == true) {
				$scope.pro.hasWx = {
					'top': $scope.pro.wxHeight + $scope.pro.Vheight + 'px'
				};
			} else {
				$scope.pro.hasWx = {
					'top':  $scope.pro.Vheight + 'px'
				};
			}
			if($scope.proContentInfos[vIndex].ctype == 1){
				var player = polyvObject('#plv_' + $scope.proContentInfos[vIndex].vid + '').videoPlayer({
					'height': $scope.pro.Vheight,
					'vid': $scope.proContentInfos[vIndex].vid,
					'ban_control': 'on',
					'session_id': 'TEST_POLYV',
					'autoplay': 1
				});
			}else if($scope.proContentInfos[vIndex].ctype == 2 && $scope.proContentInfos[vIndex].status == 5){
				$scope.pro.banPlayBack = true;
				$scope.targetUrl = $sce.trustAsResourceUrl(data.recordUrl);
			}else if($scope.proContentInfos[vIndex].ctype == 2 && $scope.proContentInfos[vIndex].status == 2){
				if($scope.proBasicInfos.ifSignUp == 1){
					$state.go('live', {
						view2: 'programDetails',
						mianNav: $stateParams.mianNav,
						nav: $stateParams.nav,
						id: $scope.pro.proId,
						liveId: vId
					});
				} else {
					$scope.pro.banPlay = true;
					$scope.pro.banImg = true;
					$scope.pro.banHeight = {
						"height": "auto"
					};
				}
			}
		}
		
		//3.7. 打开讲师详情：OpenlecturerDetails(index)
		$scope.OpenlecturerDetails = function(index) {
			$scope.cardShow = true;
			if(!addinfo.isEmptyValue(index) && !addinfo.isEmptyValue($scope.proHostInfos.datas)) {
				angular.forEach($scope.proHostInfos.datas, function(data) {
					if(data.id == index) {
						$scope.lecturer = data;
//						console.log(data.intro);
						$scope.$evalAsync();
					}
				});
			}
		}

		//3.8. 关闭讲师详情卡片： closeLecturerDetails()
		$scope.closeLecturerDetails = function() {
			$scope.cardShow = false;
		}

		//3.9. 选择点播视频集：selectVideo(index) 
		$scope.selectVideo = function(idIndex, index, stTime) {
			if(idIndex != $scope.vActived && stTime <= $scope.nowDate ) {
				//用户行为
				userBehavior(idIndex,index);
				proCount(idIndex);
				$http.post(ApiEndpoint.url + '/home/programSetStatistics', {
					id: $scope.pro.proId,
					cid: idIndex
				})
				.then(
					function(res) {});
				$scope.vActived = idIndex;
				$scope.vActivedIndex = index; 
				
				//每次点击清空视频
				$('#plv_'+$scope.pro.pro_vid.vid+'').html("");
				$scope.pro.banPlayBack = false;
				//封面按钮消失
				$scope.pro.banPlay = false;
				$scope.pro.banImg = false;
				//视频高度
				$scope.pro.banHeight = $(window).width() / 1.5 < $(window).height() ? {
					"height": $scope.pro.Vheight + "px"
				} : {
					"height": $window.innerHeight + "px"
				};
				if($scope.pro.tj_wx == true) {
					$scope.pro.hasWx = {
						'top': $scope.pro.wxHeight + $scope.pro.Vheight + 'px'
					};
				} else {
					$scope.pro.hasWx = {
						'top':  $scope.pro.Vheight + 'px'
					};
				}
				$scope.pro.pro_vid.vid = $scope.proContentInfos[index].vid;
				$scope.pro.selectItem = idIndex;
				$scope.pro.vidselectItem = idIndex;
				$scope.$evalAsync();
				var player = polyvObject('#plv_' + $scope.proContentInfos[index].vid + '').videoPlayer({
					'height': $scope.pro.Vheight,
					'vid': $scope.proContentInfos[index].vid,
					'ban_control': 'on',
					'session_id': 'TEST_POLYV',
					'autoplay': 1
				});
			}
		}

		//3.10. 选择已开播直播视频集：selectLive(index,status) 未完
		$scope.selectLive = function(index, liveId, status) {
			
			$scope.pro.vidselectItem = 1;
			//判断可点击状态2:直播中 5:已回放
			if(status == 5) {
				//用户行为
				userBehavior(liveId,index);
				proCount(liveId);
				$('#plv_'+$scope.pro.pro_vid.vid+'').html("");
				$http.post(ApiEndpoint.url + '/home/programSetStatistics', {
					id: $scope.pro.proId,
					cid: liveId
				})
				.then(
					function(res) {
						
					}
				)
				$scope.vActived = liveId;
				$scope.vActivedIndex = index;
				$scope.pro.banPlay = false;
				$scope.pro.banImg = false;
				$scope.pro.banHeight = $(window).width() / 1.5 < $(window).height() ? {
					"height": $scope.pro.Vheight + "px"
				} : {
					"height": $window.innerHeight + "px"
				};
				if($scope.pro.tj_wx == true) {
					$scope.pro.hasWx = {
						'top': $scope.pro.wxHeight + $scope.pro.Vheight + 'px'
					};
				} else {
					$scope.pro.hasWx = {
						'top':  $scope.pro.Vheight + 'px'
					};
				}
				$scope.pro.banPlayBack = true;
				$scope.targetUrl = $sce.trustAsResourceUrl($scope.proContentInfos[index].recordUrl);
			} else if(status == 2) {
				//判断是否报名
				if($scope.proBasicInfos.ifSignUp == 1) {
					//用户行为
					userBehavior(vId,vIndex);
					proCount(vId);
					$http.post(ApiEndpoint.url + '/home/programSetStatistics', {
						id: $scope.pro.proId,
						cid: liveId
					})
					.then(
						function(res) {
							console.log(res);
						}
					)
					$state.go('live', {
						view2: 'programDetails',
						mainNav: $stateParams.mainNav,
						nav: $stateParams.nav,
						id: $scope.pro.proId,
						liveId: $scope.$scope.proContentInfos[index].id
					});
				}
			}
			$scope.$evalAsync();
		}

		//3.11. 登录：proLogin()
		$scope.proLogin = function() {
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				localStorage.setItem("url", window.location.href);
				window.location.href = ApiEndpoint.wx_redirecturl;
			} else {
				$state.go("login_register", {
					nav: $stateParams.nav,
					mainNav: $stateParams.mainNav,
					view2: 'programDetails',
					id: $stateParams.id
				})
				$ionicViewSwitcher.nextDirection("forward");
			}
		}

		//3.12. 报名：showAlert()
		$scope.showAlert = function() {
			//2.6报名接口
			$http.post(ApiEndpoint.url + '/home/programSignUp', {
				uid: $scope.pro.uid,
				id: $scope.pro.proId
			}).then(
				function(res) {
					//报名
					$scope.proSignUps = (res.data.code == 200) ? res.data : false;
					if($scope.proSignUps.msg == "成功") {
						var myPopup = $ionicPopup.show({
							title: '<i class="icon iconfont">&#xe657;</i>',
							subTitle: '报名成功，开播会准时通知您哦',
							scope: $scope,
							buttons: []
						});
						myPopup.then(function(res) {
							location.reload();
						});
						$timeout(function() {
							myPopup.close();
						}, 2000);
					}
				}
			)
		}

		//3.13. 进入直播间：enterLive()
		$scope.enterLive = function() {
			$http.post(ApiEndpoint.url + '/home/programSetStatistics', {
				id: $scope.pro.proId,
				cid: $scope.multiLive[0].id
			})
			.then(
				function(res) {
					console.log(res);
				}
			)
			$state.go('live', {
				view2: 'programDetails',
				mainNav: $stateParams.mainNav,
				nav: $stateParams.nav,
				id: $scope.pro.proId,
				liveId:$scope.multiLive[0].id
			});
		}
		
		//3.14 打开群交流
	 	$scope.groupOpen = function() {
	   	$scope.optionsPopup = $ionicPopup.show({
	     	template:
	     	'<div class="groupCloseBtn" ng-click="pro.groupClose()">×</div>'+
	     	'<ion-tabs ng-if="'+$scope.pro.groupData.display_type+'==3" class="groupChats tabs-striped tabs-top tabs-background-light">'+
					'<ion-tab title="微信群"><div class="erweima"><div class="mask" ng-if="'+$scope.pro.groupData.weixin_overdue+'==0">二维码失效</div><img src="'+$scope.pro.groupData.weixin_code+'" alt="" /></div><p class="erweima">长按图片识别图中二维码</p></ion-tab>'+
					'<ion-tab title="QQ群"><div class="erweima"><img src="'+$scope.pro.groupData.qq_code+'" alt="" /></div><p class="erweima" class="align-center">长按图片识别图中二维码</p></ion-tab>'+
				'</ion-tabs>'+
				'<div ng-if="'+$scope.pro.groupData.display_type+'==1" class="groupChats"><p class="onlyOne">QQ群<p><div class="erweima"><img src="'+$scope.pro.groupData.qq_code+'" alt="" /></div><p class="erweima">长按图片识别图中二维码</p></div>'+
				'<div ng-if="'+$scope.pro.groupData.display_type+'==2" class="groupChats"><p class="onlyOne">微信群<p><div class="erweima"><div class="mask" ng-if="'+$scope.pro.groupData.weixin_overdue+'==0">二维码失效</div><img src="'+$scope.pro.groupData.weixin_code+'" alt="" /></div><p class="erweima">长按图片识别图中二维码</p></div>'
				,
	     	title: '抱团学习，加群交流',
	     	subTitle: '听说讲师们都在群里哦~',
	     	scope: $scope,
	   	});
		}   
		$scope.pro.groupClose = function(){
   		$scope.optionsPopup.close();
   	}

		//4.1
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			addinfo.setTitle($scope.proBasicInfos.title);
			$("meta[name='keywords']").attr("content", $scope.main_category + ",基因检测,NGS,精准医学,探基,直播");
			var startX = 0;
			var startY = 0;
			var $pictures = $(".moreTrainer");
			$pictures.on("touchstart", function(e) {
				startX = e.originalEvent.changedTouches[0].pageX,
					startY = e.originalEvent.changedTouches[0].pageY;
			});
			$pictures.on("touchmove", function(e) {
				var X = e.originalEvent.changedTouches[0].pageX - startX;
				var Y = e.originalEvent.changedTouches[0].pageY - startY;
				if(Math.abs(X) > Math.abs(Y) && X > 0) {
					var cur_scroll = $(this).scrollLeft();
					$(this).scrollLeft(parseInt(cur_scroll) - X);
					e.preventDefault();
					e.stopPropagation();
				} else if(Math.abs(X) > Math.abs(Y) && X < 0) {
					var cur_scroll = $(this).scrollLeft();
					$(this).scrollLeft(parseInt(cur_scroll) - X);
					e.preventDefault();
					e.stopPropagation();
				} else if(Math.abs(Y) > Math.abs(X) && Y > 0) {} else if(Math.abs(Y) > Math.abs(X) && Y < 0) {} else {}
			});
			$scope.$evalAsync();
		});
		
		// 百度统计
		addinfo.baiduCount();
		
	}]);
