define([], function() {

	var Tips = (function() {

		var $tipBox = $(".tips-box");
		var $tipsInner = $tipBox.children(".tips-inner");
		$tipBox.show();
		var tipBoxHeight = $tipsInner.css("height");
		$tipsInner.hide();
		$tipBox.removeClass("hide");

		return {
			show: function(idx) {
				var standardLinePx = 20 + 6;
				var paddingValue = '8px 0';
				var topMovePx = 24 + idx * 48 + 8;

				$tipsInner.css("top", -standardLinePx)
					.css("padding", "0")
					.css("height", "0")
					.show();
				$tipsInner.animate({
					top: -(standardLinePx + topMovePx),
					padding: paddingValue,
					height: tipBoxHeight
				}, 200);

			},
			hide: function() {
				$tipsInner.fadeOut(300);
			},
			init: function() {

			}
		};
	})();

	var resetTags = function() {
		var tags = $(".tagcloud a");
		tags.css({
			"font-size": "12px"
		});
		for (var i = 0, len = tags.length; i < len; i++) {
			var num = tags.eq(i).html().length % 5 + 1;
			tags[i].className = "";
			tags.eq(i).addClass("color" + num);
		}
	};

	//bind & slide use this index
	var index = 0;

	var slide = function(idx) {
		var $wrap = $(".switch-wrap");
		$wrap.css("transform", "translate(-" + (idx * 100) + "%,0)");
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
		index = idx;
	};

	var bind = function() {

		var timeout = 5000; //5秒后关闭
		var taskid = 0;

		$(".tips-inner li").bind("mouseup", function() {
			index = $(this).index();
			slide(index);
			Tips.hide();
		});

		$('body').click(function() {
			Tips.hide();
		});

		$(".icon").click(function() {
			Tips.show(index);
			return false;
		});

		$(".tips-box").bind("mouseenter", function() {
			clearTimeout(taskid);
		}).bind("mouseleave", function() {
			taskid = setTimeout(function() { //todo
				Tips.hide();
			}, timeout);
		});


		/*$(".icon").bind("mouseenter", function() {
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function() {
			isEnterBtn = false;
			setTimeout(function() {
				if (!isEnterTips) {
					Tips.hide();
				}
			}, 100);
		});*/



	};

	var setColumn = function() {
		var $switchPart1 = $('section.switch-part1');
		$switchPart1.siblings().css("left", function(index) {
			return (index + 1) * 100 + '%';
		});

	};

	return {
		init: function() {
			/*resetTags();*/
			bind();
			setColumn();
			Tips.init();
		},
		slide: slide
	};
});