/**
 * @author xingo
 * @date 2016-03-11 version 0.1
 * @description rewrite show sidebar
 * @update add effects to mobile-sidebar & more moudler
 * 
 */
define([], function() {

	var $menu = $('.slider-trigger'),
		$viewer = $('#viewer'),
		$viewerBoxLeft = $('.viewer-box-l'),
		$body = $('html body'),
		basicwrap,

		show = function() {
			$viewer.show({
				duration: 0,
				complete: function() {
					$viewer.addClass('show');
					$viewerBoxLeft.addClass('show');
					$body.css('overflow', 'hidden');
				}
			});
		},

		hide = function() {
			$viewer.removeClass('show');
			$viewerBoxLeft.removeClass('show');
			setTimeout(function() {
				$viewer.hide();
				$body.css('overflow', '');
			}, 250);
		};

	var bindDOM = function() {

		$menu.bind('touchend', function() {
			show();
			return false; //prevent bubbling to upper <a>
		});

		var $viewerBoxRight = $(".viewer-box-r");
		var touchStartTime;
		var touchEndTime;
		$viewerBoxRight.bind("touchstart", function() {
			touchStartTime = +new Date();
		});
		$viewerBoxRight.bind("touchend", function() {
			touchEndTime = +new Date();
			if (touchEndTime - touchStartTime < 300) {
				hide();
			}
			touchStartTime = 0;
			touchEndTime = 0;
		});


		//totop Binding
		var $overlay = $("#mobile-nav .overlay");
		var $header = $(".js-mobile-header");
		var $headerName = $('.intrude-less .header-author'); //header below avatar

		window.onscroll = function() {
			var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
			if (scrollTop >= 69) {
				$overlay.addClass("fixed");
			} else {
				$overlay.removeClass("fixed");
			}
			if (scrollTop >= 190) {
				$header.removeClass("hide").addClass("fixed");
			} else {
				$header.addClass("hide").removeClass("fixed");
			}
		};

		var lastClickPosition = 0;
		var $docuElem = $(document);
		var $bodyElem = $('html,body');
		$header.bind("touchstart", function() {
			lastClickPosition = $docuElem.scrollTop();
			$bodyElem.animate({
				scrollTop: 0
			}, 'slow');
		});
		$headerName.bind('touchstart', function() {
			$bodyElem.animate({
				scrollTop: lastClickPosition
			}, 'slow');
		});
		//totop end


		//bind viewer-div
		var animating = false;
		var $viewerTitle = $('span.viewer-title');
		$viewerTitle.bind('touchend', function(event) {
			if (animating) {
				return;
			}
			animating = true;
			var $item = $(event.currentTarget);
			if ($item.is('.hide')) {
				$item.siblings('.viewer-div').slideDown(300, function() {
					$item.removeClass('hide');
					animating = false;
				});
			} else {
				$item.siblings('.viewer-div').slideUp(300, function() {
					$item.addClass('hide');
					animating = false;
				});
			}
		});
		//end
	};


	return {
		init: function() {
			bindDOM();
		}
	};
});