/**
 * @author xingo
 * @date 2016-03-07 version 0.2
 * @description ripple effects for tips-box and mobile-sidebar
 * @update add effects to mobile-sidebar & more moudler
 * 
 */
define([], function() {

	var $rippleRemove;
	//pc
	var addRippleEffectHandler = function(event) {
		if ($rippleRemove) {
			var $rippleDivRemoveVar = $rippleRemove;
			setTimeout(function() {
				$rippleDivRemoveVar.removeClass('ripple-selecting');
				setTimeout(function() {
					$rippleDivRemoveVar.remove();
				}, 750);
			}, 750);
		}
		$itemClicked = $(this);
		var offset = $itemClicked.offset();
		var top = offset.top;
		var left = offset.left;
		if (event.data == "pc") {
			var offsetX = event.pageX - left;
			var offsetY = event.pageY - top;
		} else {
			console.log(event.originalEvent);
			top = top - $(document).scrollTop();
			var offsetX = event.clientX - left;
			var offsetY = event.clientY - top;
		}

		var radius = Math.max($itemClicked.innerHeight(), $itemClicked.innerWidth());

		var $rippleDiv = $('<div class="ripple ripple-selecting"></div>');
		$rippleDiv
			.css('width', radius + 'px')
			.css('height', radius + 'px')
			.css('left', (offsetX - radius / 2) + 'px')
			.css('top', (offsetY - radius / 2) + 'px');
		$itemClicked.append($rippleDiv);
		$rippleRemove = $rippleDiv;
		event.stopPropagation();
	};
	var removeRippleEffectHandler = function() {
		if (!$rippleRemove) {
			return;
		}
		var $rippleDiv = $rippleRemove;
		setTimeout(function() {
			$rippleDiv.removeClass('ripple-selecting');
			setTimeout(function() {
				$rippleDiv.remove();
			}, 750);
		}, 750);
	};



	return {
		init: function() {
			$('.tips-inner li') //TODO desktop touch
				//when bind mousedown and up,Firefox won't execute click event
				.on('mousedown', null, "pc", addRippleEffectHandler)
				.on('mouseup', null, "pc", removeRippleEffectHandler);
			$('#viewer-box .viewer-box-l .viewer-box-wrap>.viewer-title,#viewer-box .viewer-box-l .viewer-box-wrap li') //should investgate why touchstart and end didn't let click happen;
				.on('mousedown', null, "mobile", addRippleEffectHandler)
				.on('mouseup', null, "mobile", removeRippleEffectHandler);
		}
	};

});