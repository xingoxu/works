/**
 * @author xingo
 * @date 2016-03-07 version 0.1
 * @description 首页无限向下加载
 * @update 
 * 
 */
define([], function() {
	var limitHeight = 200;


	var getCurrentPage = function() {
		return $('#page-nav').children('.current').text();
	};
	var taskid = 0;
	var processing = false;

	var handler = function() {
		clearTimeout(taskid);
		if (processing) {
			return;
		}
		taskid = setTimeout(function() {
			processing = true;
			//check if on the bottom
			var restHeight = $(document).height() - $(document).scrollTop() - $(window).height();
			if (restHeight > limitHeight) {
				processing = false;
				return;
			}

			//check if is the last page
			var currentPage = parseInt(getCurrentPage(), 10);
			if (currentPage >= $('#page-nav').children('.page-number:last').text()) {
				processing = false;
				return;
			}
			$('.loading-circle').show();
			$.get('page/' + (currentPage + 1) + '/')
				.done(function(data, textstatus, jqxhr) {
					$nextPageArticle = $(data).find('.body-wrap').children();
					$('#page-nav').remove();
					$('.loading-circle').hide().remove();
					$('.body-wrap').append($nextPageArticle);

					processing = false;
				})
				.fail(function() {
					$('.loading-circle').children('.fail-message').show()
						.siblings().hide();
				});


		}, 300);

	};


	var bind = function() {
		$(window).scroll(handler);
	};

	var remove = function() {
		$(window).unbind('scroll', handler);
	};

	return {
		init: function() {
			bind();
		},
		bind: bind,
		remove: remove,
		handler: handler
	};

});