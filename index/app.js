import './css/style.css';
import jQuery from 'jquery';
var $ = jQuery;

var isMobileInit = false;
var loadMobile = function () {
	require.ensure(['./js/mobile.js'], function (require) {
		var mobile = require('./js/mobile.js');
		mobile.init();
		isMobileInit = true;
	}, 'mobile');
};

var isPCInit = false;
var loadPC = function () {
	require.ensure(['./js/pc.js', './js/totop.js'], function (require) {
		var pc = require('./js/pc.js');
		var totop = require('./js/totop.js');
		pc.init();
		totop.init();
		isPCInit = true;
		if (paperWhiteConfig.isPost && $('section.switch-part3').length > 0) {
			pc.slide(1);
		}
	}, 'pc');
};

var browser = {
	versions: function () {
		var u = window.navigator.userAgent;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
			iPad: u.indexOf('iPad') > -1, //是否为iPad
			webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
		};
	}()
};

$(window).bind("resize", function () {
	if (isMobileInit || isPCInit) {
		$(window).unbind("resize");
		return;
	}
	var w = $(window).width();
	if (w >= 700) {
		loadPC();
	} else {
		loadMobile();
	}
});

if (browser.versions.mobile === true || $(window).width() < 700) {
	loadMobile();
} else {
	loadPC();
}


// if (paperWhiteConfig.fancybox === true) { //暂时永远是true
import photoswipe from './js/photoswipe.js';
// }

var photoSwipeOption = photoswipe.photoSwipeOption;

//是否开启动画
// if (paperWhiteConfig.animate === true) { //暂时永远是true

import './js/jquery.lazyload.js';
//avatar
$(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
$(".js-avatar")[0].onload = function () {
	$(".js-avatar").addClass("show");
};

import ripple from './js/ripple-effects.js';
ripple.init();

// }

//是否新窗口打开链接
if (paperWhiteConfig.open_in_new == true) {
	$(".article a[href]").attr("target", "_blank");
}

//载入分享模块
// if (paperWhiteConfig.canShare) {  暂时永远是true
import share from './js/share.js';
share.init();
share.shareLinks.push({
	id: 'download', //暂时都能下载，如有不能下载的需求移动至init进行克隆数组等操作
	label: '下载',
	url: '{{raw_image_url}}',
	download: true
});
photoSwipeOption.shareEl = true;
photoSwipeOption.shareButtons = share.shareLinks;
photoSwipeOption.shareWeixinFunc = share.shareWeixin;
// }