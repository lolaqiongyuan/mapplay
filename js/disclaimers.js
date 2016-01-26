$(function(){
  var
    d = $('.disclaimers'),
    toggle = d.find('.show-full-toggle');
  
  d = d.children(':gt(2)').not(toggle);

  if(d.length) {
    d.addClass('disclaimer-toggle');
    toggle
      .addClass('active')
      .click(function(e){
        var parent = $(this).parent();

        e.preventDefault();

        parent.toggleClass('show-full');
        this.blur();

        if(!parent.hasClass('show-full')) window.scrollTo(0, parent.offset().top);
      })
      .on('touchstart mouseenter', function(){ $(this).addClass('hover-state'); })
      .on('mouseleave touchmove click', function(){ $(this).removeClass('hover-state'); });
  }
});
