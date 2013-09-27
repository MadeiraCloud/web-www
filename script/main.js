(function(){

  /* Scroll Effect for services */
  var resizeTO = null

  function onWinResize() {
    if ( resizeTO ) {
      clearTimeout( resizeTO);
    }
    resizeTO = setTimeout( onWinScroll, 200 );
  }

  function onWinScroll() {

  }
  $(window).on("scroll", onWinScroll).on("resize", onWinResize);


})();
