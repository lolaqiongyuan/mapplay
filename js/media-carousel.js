(function(){
  $(function(){
    $('.media').each(function(){
      var
        curr = $(this),
        owl,
        arrows = curr.find('.arrow'),
        leftArrow = arrows.filter('.left-arrow'),
        rightArrow = arrows.filter('.right-arrow'),
        checkDisabled = function(carousel){
          arrows.removeClass('disabled');
          if(carousel.currentItem == 0) leftArrow.addClass('disabled');
          if(carousel.currentItem == carousel.maximumItem) rightArrow.addClass('disabled');
        };

      owl = $(this).find('.media-carousel').owlCarousel({
        singleItem: true,
        afterInit: function(){ checkDisabled(this); },
        beforeMove: function(){ checkDisabled(this); }
      });

      leftArrow.click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('disabled')) owl.trigger('owl.prev');
      });

      rightArrow.click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('disabled')) owl.trigger('owl.next');
      });
    });
  });
})();
