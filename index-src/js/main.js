require([], function() {

	var isMobileInit = false;
	var loadMobile = function() {
		require(['/js/mobile.js'], function(mobile) {
			mobile.init();
			isMobileInit = true;
		});
	};
	var isPCInit = false;
	var loadPC = function() {
		require(['/js/pc.js'], function(pc) {
			pc.init();
			isPCInit = true;
			if (paperWhiteConfig.isPost && $('section.switch-part3').length>0 ) {
				pc.slide(1);
			}
		});
		require(['/js/totop.js'], function(totop) {
			totop.init();
		});
	};

	var browser = {
		versions: function() {
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

	$(window).bind("resize", function() {
		if (isMobileInit && isPCInit) {
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

	//是否使用fancybox
	var photoSwipeOption = {
		shareEl: false,
		closeOnScroll: false,
		bgOpacity: 0.8,
		showAnimationDuration: 333,
	};
	var shareWeixinFunc;
	if (paperWhiteConfig.fancybox === true) {
		require([
			'/photoswipe/photoswipe.min.js',
			'/photoswipe/photoswipe-ui-default.min.js'
		], function (PhotoSwipe, PhotoSwipeUI_Default) {
			if ($(".isFancy").length == 0 || paperWhiteConfig.isHome === true) {
				return;
			}
			var $imgArr = $(".article-inner img"),
				  pswpElement = $('.pswp')[0],
					items = [];
			var pswpController;

			$imgArr.click(function(){
				items = [];
				var _this = this,
						_index;
				$imgArr.each(function(index){
					var $img = $(this);
					// var img = $img.getAttribute('data-idx', index);
					var src = $img.attr('data-target') || $img.prop('src');
					var title = $img.attr('alt');
					items.push({
						src: src,
						w: this.width,
						h: this.height,
						title: title,
						el: this,
					});
					if(_this==this){
						_index = index;
					}
				})
				photoSwipeOption.index = parseInt(_index);
				pswpController = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, photoSwipeOption);

				//分享 - 微信hook
				if (paperWhiteConfig.canShare){
					pswpController.listen('shareLinkClick',function(e,target){
						if(!$(e.target).is('.pswp__share--wechat'))
							return;
						//移除href使得不打开新窗口
						$(e.target).removeAttr('href');
						
						//退出全屏
						var d = document;
						var exitFullScreen = d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen;
						exitFullScreen && exitFullScreen.call(d);

						shareWeixinFunc && shareWeixinFunc();
					});
				}

				pswpController.init();
			});
			photoSwipeOption.getThumbBoundsFn = function (index) {
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = items[index].el.getBoundingClientRect();

				return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
			};

			//滚轮下一张
			var pswpAnimating = false;
			$('.pswp__scroll-wrap').on('DOMMouseScroll mousewheel',function(event){
				if(pswpAnimating)
					return;
				pswpAnimating = true;
				event = event.originalEvent;
				if(!(event.wheelDelta || event.detail))
					return;
				var isNextPage = false;
				if(event.wheelDelta && event.wheelDelta < 0)
					{ isNextPage = true; }				
				else if(event.detail && event.detail > 0)
					{ isNextPage = true; }
				nextPageAnimation();
				pswpController[(isNextPage ? 'next': 'prev')]();
				setTimeout(function(){
					pswpAnimating = false;
				},500);//default Animation Time 333/400transition;
			});
			//下一张有动画效果
			function nextPageAnimation(){
				$('.pswp__container').css('transition','.3s transform ease');
				setTimeout(function(){
					$('.pswp__container').css('transition','');
				},400);
			}
			$('.pswp__button--arrow--left,.pswp__button--arrow--right').mousedown(function(){
				nextPageAnimation();
			})


			// parse picture index and gallery index from URL (#&pid=1&gid=2)
			var photoswipeParseHash = function () {
				var hash = window.location.hash.substring(1),
					params = {};

				if (hash.length < 5) {
					return params;
				}

				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
					if (!vars[i]) {
						continue;
					}
					var pair = vars[i].split('=');
					if (pair.length < 2) {
						continue;
					}
					params[pair[0]] = pair[1];
				}

				if (params.gid) {
					params.gid = parseInt(params.gid, 10);
				}

				return params;
			};
			var hashData = photoswipeParseHash();
			if (hashData.pid && hashData.gid) {
				$($imgArr[hashData.pid - 1]).click();
			}
		})

	}
	//是否开启动画
	if (paperWhiteConfig.animate === true) {

		require(['/js/jquery.lazyload.js'], function() {
			//avatar
			$(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
			$(".js-avatar")[0].onload = function() {
				$(".js-avatar").addClass("show");
			};
		});

		require(['/js/ripple-effects.js'], function(ripple) {
			ripple.init();
		});

		if (paperWhiteConfig.isHome === true) {
			//content
			var showArticle = function() {
				$(".article").each(function() {
					if ($(this).offset().top <= $(window).scrollTop() + $(window).height() && !($(this).hasClass('show'))) {
						$(this).removeClass("hidden").addClass("show");
						$(this).addClass("is-hiddened");
					} else {
						if (!$(this).hasClass("is-hiddened")) {
							$(this).addClass("hidden");
						}
					}
				});
			};
			$(window).on('scroll', function() {
				showArticle();
			});
			showArticle();
			//end

			//clickOnArticle
			var indexArticleClickAnimate = function($article) {
				$article.css('box-shadow', '0 0 20px rgba(0,0,0,0.3)')
					.children('.index-progress')
					.css('height', '3px');
			};

			$('article').find('a').not('.article-category-link')
				.on('mousedown.loadingAnimation', function() {
					indexArticleClickAnimate($(this).parents('article'));
				});
			$('.article-entry').find('a').off('mousedown.loadingAnimation');
			//end



			//home ajax
			var cookiename = encodeURIComponent("ajaxload") + "=",
				cookie = document.cookie,
				useAjax = false;
			var cookieIndex = cookie.indexOf(cookiename);
			if (cookieIndex >= 0) {
				var cookieEndIndex = cookie.indexOf(";", cookieIndex);
				if (cookieEndIndex == -1) cookieEndIndex = cookie.length;
				useAjax = cookie.substring(cookieIndex + cookiename.length, cookieEndIndex); //"true/false"

				if (useAjax == "true") {
					useAjax = true;
				} else {
					useAjax = false;
				}
			}

			//remove disabled
			var $switchInput = $('.ajax-checkbox').children('input'),
				durationTime = 24 * 60 * 60 * 1000;
			$switchInput.prop('disabled', false);

			var ajaxInited = false;
			var ajaxModule;
			if (useAjax) {
				require(['/js/nextpageajax.js'], function(ajax) {
					ajax.init();
					ajaxModule = ajax;
					ajaxInited = true;
				});
				$switchInput.prop('checked', true);
			} else {
				$switchInput.prop('checked', false);
			}
			//set click handler
			$('.ajax-checkbox').click(function(event) {
				//fix twice click input in label tag
				var elementClicked = event.target;
				if (elementClicked.tagName == 'LABEL') {
					return;
				}

				if ($switchInput.is(':checked')) {

					if (ajaxInited) {
						ajaxModule.bind();
					} else {
						require(['/js/nextpageajax.js'], function(ajax) {
							ajax.init();
							ajaxModule = ajax;
							ajaxInited = true;
						});
					}
					document.cookie = (encodeURIComponent("ajaxload") + "=" + encodeURIComponent("true") + "; expires=" + (new Date((Date.now() + durationTime))).toUTCString() + "; secure");
				} else {
					ajaxModule.remove();
					document.cookie = (encodeURIComponent("ajaxload") + "=" + encodeURIComponent("false") + "; expires=" + (new Date((Date.now() + durationTime))).toUTCString() + "; secure");
				}
			});
			//end

		}

	}

	//是否新窗口打开链接
	if (paperWhiteConfig.open_in_new == true) {
		$(".article a[href]").attr("target", "_blank");
	}

	//载入分享模块
	if (paperWhiteConfig.canShare) {
		require(['/js/share.js'], function(share) {
			share.init();
			share.shareLinks.push({
				id: 'download', //暂时都能下载，如有不能下载的需求移动至init进行克隆数组等操作
				label: '下载',
				url:'{{raw_image_url}}', 
				download: true 
			});
			photoSwipeOption.shareEl = true;
			photoSwipeOption.shareButtons = share.shareLinks;
			shareWeixinFunc = share.shareWeixin;
		});
	}



});