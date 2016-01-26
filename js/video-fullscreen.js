$(function(){
  if($('.fullscreen-video').length) {
    detectVideoAlign();
    $(window).on('throttled-resize', detectVideoAlign);
  }
});

function detectVideoAlign(){
  $('.fullscreen-video').each(function(){
    var curr = $(this);
    if(curr.height() * 1.777778 > curr.width()) curr.addClass('vertical-scale');
    else curr.removeClass('vertical-scale');
  });
}
