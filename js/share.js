/** 
 * Share Moudle to set url of each button
 * @author xingo
 * @version v0.1
 * @update 
 */
define([], function() {
	//attribute in ejs may be "undefined"
	var $sharediv = $('.article-share'),

		URL = $sharediv.attr('data-url'),
		URLEncoded = encodeURIComponent(URL),

		title = $sharediv.attr('data-title'),
		titleEncoded = encodeURIComponent(title),

		image = $sharediv.attr('data-image'),
		imageURLEncoded = encodeURIComponent(image),

		descriptionEncoded = encodeURIComponent($('head').children('meta[name=description]').attr('content')),

		icon = $sharediv.attr('favicon'),
		iconURLEncoded = encodeURIComponent(icon),

		duoshuoid = $sharediv.attr('duoshuo-id'),
		tsina = $sharediv.attr('data-tsina'),
		twitterid = $sharediv.attr('twitterid');



	var qrcodePicURL = "https://" + (duoshuoid ? duoshuoid : "blog-xingoxu") + ".duoshuo.com/api/qrcode/getImage.png?size=240&text=" + URLEncoded,

		weiboURL = "http://service.weibo.com/share/share.php?title=" + titleEncoded + "&url=" + URLEncoded + "&source=bookmark&appkey=3077078248",

		twitterURL = "https://twitter.com/intent/tweet?text=" + titleEncoded + "&url=" + URLEncoded,

		googleURL = "https://plus.google.com/share?url=" + URLEncoded,

		qqURL = "http://connect.qq.com/widget/shareqq/index.html?url=" + URLEncoded + "&desc=&title=" + titleEncoded,
		facebookURL = "https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=" + titleEncoded + "&p%5Burl%5D=" + URLEncoded;

	if (imageURLEncoded != "undefined") {
		weiboURL += ("&pic=" + imageURLEncoded);

		facebookURL += ("&p%5Bimages%5D=" + imageURLEncoded);
	}
	if (tsina != 'undefined' && tsina) {
		weiboURL += ("&ralateUid=" + tsina);
	}
	if (twitterid != 'undefined' && twitterid) {
		twitterURL += ("&via=" + twitterid);
	}
	var imgHTML = "";
	if (iconURLEncoded != 'undefined') {
		qqURL += ("&pics=" + iconURLEncoded);
		imgHTML = '<img id="logo-qrcode" src="' + icon + '" />';
	}
	if (descriptionEncoded != "undefined") {
		qqURL += ("&summary=" + descriptionEncoded);
	}
	var qrHTML = '<div class="body-mask"></div><div class="qrcode-module"><h2>微信扫一扫，分享到朋友圈</h2><img id="qrcode-pic" src="' + qrcodePicURL + '" />' + imgHTML + '</div>';

	$sharediv.children('.share-weibo').attr('href', weiboURL)
		.siblings('.share-twitter').attr('href', twitterURL)
		.siblings('.share-google').attr('href', googleURL)
		.siblings('.share-qq').attr('href', qqURL)
		.siblings('.share-facebook').attr('href', facebookURL);



	$('body').append($(qrHTML));

	//show qrcode bind
	var $bodymask = $('.body-mask'),
		$qrcodeModule = $('.qrcode-module'),
		$body = $('body'),
		isSecondClick = false;

	$sharediv.children('.share-wechat').click(function() {
		$bodymask.fadeIn(300);
		$qrcodeModule.show({
			duration: 0,
			complete: function() {
				$qrcodeModule.addClass('show');
			}
		});
		$body.css('overflow', 'hidden');
	});
	$bodymask.click(function() {
		if (isSecondClick) return;
		isSecondClick = true;
		$qrcodeModule.removeClass('show');
		setTimeout(function() {
			$qrcodeModule.hide();
		}, 300);
		$body.css('overflow', '');
		$bodymask.fadeOut(300, function() {
			$(this).hide();
			isSecondClick = false;
		});
	});

	return {
		init: function() {
			$qrcodeModule.hide();
		}
	};


});