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

});
