$.get('./weixinAPI/test.php', {}, function(data) { 
	var signPackage = JSON.parse(data);
	console.log(signPackage);
	wx.config({
		debug: true,
		appId: signPackage.appId,
		timestamp: signPackage.timestamp,
		nonceStr: signPackage.nonceStr,
		signature: signPackage.signature,
		jsApiList: [
			// 所有要调用的 API 都要加到这个列表中
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'chooseImage',
			'previewImage',
			'uploadImage',
			'downloadImage',
			'getNetworkType',
			'hideOptionMenu',
			'showOptionMenu',
			'hideMenuItems',
			'showMenuItems',
			'hideAllNonBaseMenuItem',
			'showAllNonBaseMenuItem',
			'closeWindow',
			'scanQRCode'
		]
	});
	
	wx.ready(function() {
		/*分享到朋友圈*/
		wx.onMenuShareTimeline({
			title: '探基', // 分享标题
			link: '', // 分享链接
			imgUrl: './img/TJ.jpg', // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
		/*分享给朋友*/
		wx.onMenuShareAppMessage({
			title: '探基', // 分享标题
			desc: '基因测序', // 分享描述
			link: '', // 分享链接
			imgUrl: './img/Tj.jpg', // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
	});
	
})


