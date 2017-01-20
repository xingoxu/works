import $ from 'jquery';
import PhotoSwipe from 'photoswipe/dist/photoswipe.js';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

var photoSwipeOption = {
  shareEl: false,
  closeOnScroll: false,
  bgOpacity: 0.8,
  showAnimationDuration: 333,
};
(function () {
  if ($(".isFancy").length == 0 || paperWhiteConfig.isHome === true) {
    return;
  }
  var $imgArr = $(".article-inner img"),
    pswpElement = $('.pswp')[0],
    items = [];
  var pswpController;

  $imgArr.click(function () {
    items = [];
    var _this = this,
      _index;
    $imgArr.each(function (index) {
      var $img = $(this);
      var src = $img.attr('data-target') || $img.prop('src');
      var title = $img.attr('alt');
      items.push({
        src: src,
        w: this.width,
        h: this.height,
        title: title,
        el: this,
      });
      if (_this == this) {
        _index = index;
      }
    })
    photoSwipeOption.index = parseInt(_index);
    pswpController = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, photoSwipeOption);

    //分享 - 微信hook
    if (paperWhiteConfig.canShare) {
      pswpController.listen('shareLinkClick', function (e, target) {
        if (!$(e.target).is('.pswp__share--wechat'))
          return;
        //移除href使得不打开新窗口
        $(e.target).removeAttr('href');

        //退出全屏
        var d = document;
        var exitFullScreen = d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen;
        exitFullScreen && exitFullScreen.call(d);

        photoSwipeOption.shareWeixinFunc && photoSwipeOption.shareWeixinFunc();
      });
    }

    pswpController.init();
  });
  photoSwipeOption.getThumbBoundsFn = function (index) {
    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
      rect = items[index].el.getBoundingClientRect();

    return {
      x: rect.left,
      y: rect.top + pageYScroll,
      w: rect.width
    };
  };

  //滚轮下一张
  var pswpAnimating = false;
  $('.pswp__scroll-wrap').on('DOMMouseScroll mousewheel', function (event) {
    if (pswpAnimating)
      return;
    pswpAnimating = true;
    event = event.originalEvent;
    if (!(event.wheelDelta || event.detail))
      return;
    var isNextPage = false;
    if (event.wheelDelta && event.wheelDelta < 0) {
      isNextPage = true;
    } else if (event.detail && event.detail > 0) {
      isNextPage = true;
    }
    nextPageAnimation();
    pswpController[(isNextPage ? 'next' : 'prev')]();
    setTimeout(function () {
      pswpAnimating = false;
    }, 500); //default Animation Time 333/400 transition;
  });
  //下一张有动画效果
  function nextPageAnimation() {
    $('.pswp__container').css('transition', '.3s transform ease');
    setTimeout(function () {
      $('.pswp__container').css('transition', '');
    }, 400);
  }
  $('.pswp__button--arrow--left,.pswp__button--arrow--right').mousedown(function () {
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
})()

export default {
  photoSwipeOption: photoSwipeOption,
}