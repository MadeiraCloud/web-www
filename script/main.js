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
    baseline = $services.offset().top + $services.height() + 100 - docEl.clientHeight;
  }
  doResize();

  function onWinScroll() {
    var scrollY = window.scrollTop || window.scrollY;
    if ( scrollY >= baseline ) {
      // Show tags
      $("#mcServices").removeClass("hide");
      $(window).off("scroll", onWinScroll).off("resize", onWinResize);
    }
  }

  $(window).on("scroll", onWinScroll).on("resize", onWinResize);

  /* Feature silder */
  $("#mcFeatures")
    .on("click", ".btn_prev", function( evt ){ nextSilder( evt, true); })
    .on("click", ".btn_next", nextSilder );

  function nextSilder( evt, isPrev ) {
    var $lastShow = $("#mcFeatureContent .show");
    var $children = $("#mcFeatureContent").children();
    var index = $lastShow.index();
    if ( isPrev === true ) {
      if ( index <= 0 ) {
        index = $children.length - 1;
      } else {
        --index;
      }
    } else {
      ++index;
      if ( index == $children.length ) {
        index = 0;
      }
    }

    $lastShow.removeClass("show");
    var $show = $children.eq( index ).addClass("show");

    if ( false /* Doesn't support transition */ )
    {
      $lastShow.animate({opacity : 0}, 300);
      $show.animate({opacity : 1}, 300);
    }
  }

  /* Auto slider */
  haltAutoSlide = false;
  setInterval(function(){
    if ( haltAutoSlide )
      return;
    $("#mcFeatures").children(".btn_next").click();
  }, 5000);

});
