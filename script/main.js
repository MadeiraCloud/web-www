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
    .on("click", ".btn_prev", function( evt ){ nextSlide( evt, true); })
    .on("click", ".btn_next", nextSlide );


  /* Auto slide */
  autoSlideTO = null;
  function doNextSlide () {
    return;
    if ( autoSlideTO ) {
      clearTimeout( autoSlideTO );
    }
    autoSlideTO = setTimeout(function(){
      $("#mcFeatures").children(".btn_next").click();
    }, 5000)
  }
  doNextSlide();

  function nextSlide( evt, isPrev ) {
    var $lastShow = $("#mcFeatureContent .show");
    var $children = $("#mcFeatureContent").children();
    var index     = $lastShow.index();
    var nextIndex = index;
    if ( isPrev === true ) {
      if ( nextIndex <= 0 ) {
        nextIndex = $children.length - 1;
      } else {
        --nextIndex;
      }
    } else {
      ++nextIndex;
      if ( nextIndex == $children.length ) {
        nextIndex = 0;
      }
    }

    $lastShow.removeClass("preshow");
    // Enlarge the showing feature.
    var $show = $children.eq( nextIndex ).addClass("preshow");
    setTimeout( function(){
      $lastShow.removeClass("show");
      $show.addClass("show");
    }, 18 );

    if ( false /* Doesn't support transition */ )
    {
      $lastShow.animate({opacity : 0}, 300);
      $show.animate({opacity : 1}, 300);
    }


    // Animate Desc
    var $desc = $("#mcFeatureDescs").children();
    var $descHide = $desc.eq( index ).removeClass("show");
    var $descShow = $desc.eq( nextIndex ).addClass("show");

    cssprop   = isPrev ? "margin-right" : "margin-left";
    resetprop = !isPrev ? "margin-right" : "margin-left";
    animator  = {};

    animator[ cssprop ] = "-150px";

    $descHide.children("h3").stop().animate( animator );

    animator[ cssprop ] = "0px";
    reset = {}
    reset[ cssprop ]  = "150px";
    reset[ resetprop ] = "0px";
    $descShow.children("h3").stop().css( reset ).animate( animator );

    doNextSlide();
  }

});
