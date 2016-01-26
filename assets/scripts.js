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

(function(){
  var
    maxItems = 18,
    itemLoadIncrement = 3;

  function getRelatedItems(container, carousel){
    if(carousel.data().req) carousel.data().req.abort();

    carousel.data().req = $.get('/related-items-demo.html').done(function(data){
      if(data != '') {
        if(carousel.hasClass('owl-carousel')) {
          var
            transitionTimeout = null;
            owl = carousel.data('owlCarousel'),
            currItem = owl.currentItem,
            addData = function(){
              if(transitionTimeout) clearTimeout(transitionTimeout);
              container.css('height', container.height());
              owl.addItem(data);
              owl.jumpTo(currItem);
              container.css('height', '');
            };

          if(owl.$owlWrapper.hasClass('transitioning')) owl.$owlWrapper.one('transitionend', addData);
          transitionTimeout = setTimeout(addData, 250);
        }
        else carousel.append(data);

        carousel.data().totalItems += itemLoadIncrement;
        checkItemMax(container, carousel);
      }
      else checkItemMax(container, carousel, true);
    }).fail(function(){
      //prevent loading more on error
      checkItemMax(container, carousel, true);
    });
  }

  function checkItemMax(container, carousel, preventLoad) {
    if(preventLoad || carousel.data().totalItems >= maxItems) container.addClass('max-items');
  }

  $(function(){
    $('.related').each(function(){
      var
        curr = $(this),
        carousel = curr.find('.related-carousel'),
        loadBtn = curr.find('.btn-load'),
        init;

      init = function(){
        var owl = carousel.data('owlCarousel');

        if(curr.css('min-height') == '1px') {
          if(owl) owl.destroy();
        }
        else if(typeof owl === 'undefined') {
          carousel.owlCarousel({
            singleItem: true,
            afterInit: function(){
              this.$owlWrapper.on('transitionend', function(){
                this.$owlWrapper.removeClass('transitioning');
              }.bind(this));
            },
            beforeMove: function(){
              this.$owlWrapper.addClass('transitioning');

              if(this.currentItem == this.maximumItem && !curr.hasClass('max-items')) {
                getRelatedItems(curr, carousel);
              }
            }
          });
        }

        carousel.data({
          totalItems: carousel.find('.item').length,
          req: null
        });
      };

      loadBtn
        .on('touchstart click', function(e){
          e.preventDefault();
          getRelatedItems(curr, carousel);
          this.blur();
        })
        .on('mouseenter', function(){
          $(this).addClass('hover-state');
        })
        .on('mouseleave click', function(){ $(this).removeClass('hover-state'); });

      init();
      $(window).on('throttled-resize', init);
    });
  });
})();

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

$(function(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  
});

function onYouTubeIframeAPIReady() {
  $('.video').each(function(){
    var
      curr = $(this),
      wrapper = curr.children('.video-wrapper'),
      id = curr.attr('data-video-id');

    curr.one('click', function(){
      new YT.Player(wrapper.get(0), {
        videoId: id,
        playerVars: { 'autoplay': 1 }
      });
    });
  });
}
