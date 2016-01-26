$(function(){
  function setRespImgSrc(){
    var imgs = $('[data-small-src]');

    if(imgs.length) {
      var data = (imgs.first().css('min-height') == '1px') ? 'large-src' : 'small-src';

      imgs.each(function(){
        var
          curr = $(this),
          newSrc = curr.data(data);
        
        if(curr.attr('src') !== newSrc) curr.attr('src', newSrc);
      });
    }
  }

  setRespImgSrc();
  $(window).on('throttled-resize', setRespImgSrc);
});