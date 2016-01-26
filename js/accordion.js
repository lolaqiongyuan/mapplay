$(function(){
  $('[data-accordion-target]').each(function(){
    var
      curr = $(this),
      targetSelector = curr.attr('data-accordion-target'),
      target = (targetSelector == '') ? curr.next() : $(targetSelector);

    curr.on('click', function(e){
      e.preventDefault();

      if(target.hasClass('open')) {
        var startHeight = target
          .children('.accordion-content')
          .outerHeight() + 'px';

        target.css('height', startHeight);

        target.css('height'); //this forces a repaint dont remove
        target
          .css('height', '')
          .trigger('closing');
      }
      else {
        var newHeight = target
          .children('.accordion-content')
          .outerHeight() + 'px';

        target
          .css('height', newHeight)
          .trigger('opening');
      }

      target
        .addClass('transitioning')
        .toggleClass('open');

      curr.toggleClass('open');
    })

    target.on('transitionend', function(){
      var curr = $(this);
      
      curr.removeClass('transitioning');

      if(curr.hasClass('open')) {
        curr
          .css('height', 'auto')
          .trigger('opened');
      }
      else curr.trigger('closed');
    });
  });
});
