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
