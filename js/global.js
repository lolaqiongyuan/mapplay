//throttled resize event
(function(){
  var resizeTimeout = null;

  $(function(){
    $(window).on('resize', function(){
      if(resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function(){
        $(window).trigger('throttled-resize');
      }, 100);
    });
  });
})();
