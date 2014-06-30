$(function(){
  var currentURL = document.URL;

  if (currentURL && currentURL.indexOf('/#redirect') !== -1) {
    $('body').addClass('redirected');
  }

  function onWinScroll() {
    $("#mcHeader").toggleClass("sticky", scrollY > 0)
  }

  $(window).on("scroll", onWinScroll);

  if ($(window).width()>860) {
    skrollr.init();
  }
  slider = function(options){
      selector = options.selector;
      $slider = $(selector);
      $li = $slider.find('li');
      $currentLi = $slider.find("li.active");
      index = $currentLi.index();
      $li.eq(index).addClass('fadeOut');
      window.setTimeout(function(){
          $li.eq(index).removeClass('active')
      },options.timeout);
  }
});
