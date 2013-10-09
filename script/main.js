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
    if ( autoSlideTO ) {
      clearTimeout( autoSlideTO );
    }
    autoSlideTO = setTimeout(function(){
      $("#mcFeatures").children(".btn_next").click();
    }, 5000);
  }
  doNextSlide();

  var supportsTransitions = (function supportsTransitions() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';
    if(typeof s[p] == 'string') {return true; }

    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for(var i=0; i<v.length; i++) {
      if(typeof s[v[i] + p] == 'string') { return true; }
    }
    return false;
  })();

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

    if ( supportsTransitions == false /* Doesn't support transition */ )
    {
      $lastShow.animate({opacity : 0}, 300);
      $show.animate({opacity : 1}, 300);
    }


    // Animate Desc
    var $desc = $("#mcFeatureDescs").addClass("no_ani").children().removeClass("left right");
    var $descHide = $desc.eq( index ).addClass( isPrev ? "right" : "left" );
    var $descShow = $desc.eq( nextIndex ).addClass( isPrev ? "left" : "right" );
    setTimeout(function(){
      $("#mcFeatureDescs").removeClass("no_ani");
      $descHide.removeClass("show");
      $descShow.addClass("show");
    }, 50);

    doNextSlide();
  }

  function getPageX( evt ) {
    if ( evt.originalEvent.touches && evt.originalEvent.touches.length ) {
      return evt.originalEvent.touches[0].pageX;
    } else {
      return evt.pageX;
    }
  }

  // Focus drag
  $(".focus_hanlder")
    .on("mousedown touchstart", function( evt ){
      var handle = $(".focus_hanlder")
        .addClass("active")
        .data("xpos", getPageX( evt ) );

      var onmove = function( evt ) {
        var offsetX = getPageX( evt ) - parseInt( handle.data("xpos") );
        handle.data("xpos", getPageX( evt ) );

        var $control = $(".focus_control");
        var newX = Math.round( $control.position().left + offsetX );
        var max  = $(".feature_2").outerWidth();
        if ( newX < 0 ) {
          newX = 0;
        } else if ( newX > max ) {
          newX = max;
        }

        newX = (newX * 100.0 / max) + "%";
        $control
          //.data("pos", newX / max)
          .css("left", newX );

        $(".focus_bg").width( newX );

        // Disable auto slide for now
        if ( autoSlideTO ) {
          clearTimeout( autoSlideTO );
        }
      }

      $("body").one("mouseup touchend mouseleave", function(){
        $(".focus_hanlder").removeClass("active")
        $("body").off("mousemove touchmove", onmove);

        // Enable auto slide
        doNextSlide();
      })
      $("body").on("mousemove touchmove", onmove);

      return false;
    });
});
