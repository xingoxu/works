/**
 * @author xingo
 * @date 2016-03-05 version 0.3
 * @description 回顶部 回原位置
 * @update 使用require写法
 */
define([], function() {

    // When to show the scroll link
    // higher number = scroll link appears further down the page    
    var upperLimit = 700;

    // Scroll to top time
    var toTopTime = 500;

    // Our scroll link element
    var $scrollElem = $('#totop');

    //start init status
    if ($(document).scrollTop() > upperLimit) {
        $scrollElem.stop().fadeTo(300, 1).children('i').attr('class', 'fa fa-angle-double-up');
    } else {
        $scrollElem.hide();
    }

    var showAnime = true;

    // Show and hide the scroll to top link based on scroll position
    $(window).scroll(function() {
        if (showAnime) {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > upperLimit) {
                $scrollElem.stop().fadeTo(300, 1).children('i').attr('class', 'fa fa-angle-double-up');
            } else {
                $scrollElem.stop().fadeTo(300, 0, function() {
                    $(this).hide();
                });
            }
        }
    });


    // toggle to top/to recover animation on click
    var positionBefore = 0;
    var showAnimeDelayFunc = function() {
        showAnime = true;
    };
    var $bodyElem = $('html, body');

    $scrollElem.click(
        function() {
            if (!showAnime) {
                return;
            }
            showAnime = false;
            if ($(document).scrollTop() !== 0) { //at below
                positionBefore = $(document).scrollTop();
                $bodyElem.animate({
                    scrollTop: 0
                }, {
                    duration: toTopTime,
                    complete: function() {
                        $scrollElem.children('i').attr('class', 'fa fa-angle-double-down');
                        setTimeout(showAnimeDelayFunc, 100);
                    }
                });
            } else { //at top
                $bodyElem.animate({
                    scrollTop: positionBefore
                }, {
                    duration: toTopTime,
                    complete: function() {
                        $scrollElem.children('i').attr('class', 'fa fa-angle-double-up');
                        setTimeout(showAnimeDelayFunc, 100);
                    }
                });
                positionBefore = 0;
            }
            return false;
        }
    );

    return {
        init: function() {}
    };

});