//throttled resize event
(function(){
	
	//return the promise
	function get(url){

		var promise = new Promise(function(resolve, reject){
			var ajax = new XMLHttpRequest();

			ajax.open('GET', url);

			ajax.onload = function(){
				if(ajax.status == 200) {
					resolve(ajax.response);
				} else {
					reject(ajax);
				}
			}
			ajax.send();
		});

		return promise;
	};

	get('dam/africa.svg').then(function(response){
		var id = document.getElementById('map');
		$(response).appendTo(id);

	}).catch(
        // Log the rejection reason
        function(reason) {
        	console.log('Handle rejected promise ('+reason+') here.');
        });

})();
// (function(){
//   var
//     maxItems = 18,
//     itemLoadIncrement = 3;

//   function getRelatedItems(container, carousel){
//     if(carousel.data().req) carousel.data().req.abort();

//     carousel.data().req = $.get('/related-items-demo.html').done(function(data){
//       if(data != '') {
//         if(carousel.hasClass('owl-carousel')) {
//           var
//             transitionTimeout = null;
//             owl = carousel.data('owlCarousel'),
//             currItem = owl.currentItem,
//             addData = function(){
//               if(transitionTimeout) clearTimeout(transitionTimeout);
//               container.css('height', container.height());
//               owl.addItem(data);
//               owl.jumpTo(currItem);
//               container.css('height', '');
//             };

//           if(owl.$owlWrapper.hasClass('transitioning')) owl.$owlWrapper.one('transitionend', addData);
//           transitionTimeout = setTimeout(addData, 250);
//         }
//         else carousel.append(data);

//         carousel.data().totalItems += itemLoadIncrement;
//         checkItemMax(container, carousel);
//       }
//       else checkItemMax(container, carousel, true);
//     }).fail(function(){
//       //prevent loading more on error
//       checkItemMax(container, carousel, true);
//     });
//   }

//   function checkItemMax(container, carousel, preventLoad) {
//     if(preventLoad || carousel.data().totalItems >= maxItems) container.addClass('max-items');
//   }

//   $(function(){
//     $('.related').each(function(){
//       var
//         curr = $(this),
//         carousel = curr.find('.related-carousel'),
//         loadBtn = curr.find('.btn-load'),
//         init;

//       init = function(){
//         var owl = carousel.data('owlCarousel');

//         if(curr.css('min-height') == '1px') {
//           if(owl) owl.destroy();
//         }
//         else if(typeof owl === 'undefined') {
//           carousel.owlCarousel({
//             singleItem: true,
//             afterInit: function(){
//               this.$owlWrapper.on('transitionend', function(){
//                 this.$owlWrapper.removeClass('transitioning');
//               }.bind(this));
//             },
//             beforeMove: function(){
//               this.$owlWrapper.addClass('transitioning');

//               if(this.currentItem == this.maximumItem && !curr.hasClass('max-items')) {
//                 getRelatedItems(curr, carousel);
//               }
//             }
//           });
//         }

//         carousel.data({
//           totalItems: carousel.find('.item').length,
//           req: null
//         });
//       };

//       loadBtn
//         .on('touchstart click', function(e){
//           e.preventDefault();
//           getRelatedItems(curr, carousel);
//           this.blur();
//         })
//         .on('mouseenter', function(){
//           $(this).addClass('hover-state');
//         })
//         .on('mouseleave click', function(){ $(this).removeClass('hover-state'); });

//       init();
//       $(window).on('throttled-resize', init);
//     });
//   });
// })();

// $(function(){
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  
// });

// function onYouTubeIframeAPIReady() {
//   $('.video').each(function(){
//     var
//       curr = $(this),
//       wrapper = curr.children('.video-wrapper'),
//       id = curr.attr('data-video-id');

//     curr.one('click', function(){
//       new YT.Player(wrapper.get(0), {
//         videoId: id,
//         playerVars: { 'autoplay': 1 }
//       });
//     });
//   });
// }
