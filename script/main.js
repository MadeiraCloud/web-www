$(function(){

  /* Scroll Effect for services */
  var resizeTO       = null
  var baseline       = 0;

  var viewportTop    = 0;
  var viewportBottom = 0;
  var docHeight      = 0;
  var docEl          = document.documentElement;

  function onWinResize() {
    if ( resizeTO ) {
      clearTimeout( resizeTO);
    }
    resizeTO = setTimeout( doResize, 200 );
  }

  function doResize() {
    var $services = $("#mcServices");
    var viewport  = docEl.clientHeight;
    if ( viewport <= 640 && docEl.clientWidth <= 480 ) {
      viewport += 30;
    } else {
      viewport += 100;
    }
    baseline = $services.offset().top + $services.height() - viewport;
  }
  doResize();

  function onWinScroll() {
    var scrollY = window.scrollTop || window.scrollY;
    if ( scrollY >= baseline ) {
      // Show tags
      $("#mcServices").removeClass("hide");
      $(window).off("resize", onWinResize);//.off("scroll", onWinScroll)
    }

    $("#mcHeader").toggleClass("sticky", scrollY > 0)
  }

  $(window).on("scroll", onWinScroll).on("resize", onWinResize);

  if ($(window).width()>860) { skrollr.init(); }
});
