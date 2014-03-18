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

  // Generate SVG line
  function calcLine( pos1, pos2 ) {
    var d = "M" + pos1.left + " " + (pos1.top+50);

    d += "L" + pos1.left + " " + (pos2.top - 146);

    if ( pos1.left < pos2.left ) {d += "s 0 6 6 6";} else {d += "s 0 6 -6 6";}

    if ( pos1.left < pos2.left ) {
      d += "L" + (pos2.left - 6) + " " + (pos2.top - 140);
      d += "s 6 0 6 6";
    } else {
      d += "L" + (pos2.left + 6) + " " + (pos2.top - 140);
      d += "s -6 0 -6 6";
    }

    d += "L" + pos2.left + " " + (pos2.top - 5);
    return d;
  }
  function createLine( pos1, pos2, id ) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
    path.setAttribute("d", calcLine(pos1, pos2));
    path.setAttribute("stroke", "white");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "4");
    path.setAttribute("id", id);
    $("#hiw_lines")[0].appendChild( path );
  }
  function drawLine(){

    var pos0 = $(".intro").offset();
    var pos1 = $(".hiw_01 h3").offset();
    var pos2 = $(".hiw_02 h3").offset();
    var pos3 = $(".hiw_03 h3").offset();
    var pos4 = $(".hiw_04 h3").offset();

    pos1.top -= pos0.top;
    pos2.top -= pos0.top;
    pos3.top -= pos0.top;
    pos4.top -= pos0.top;
    pos1.left = Math.round(pos1.left + 23);
    pos2.left = Math.round(pos2.left + 22);
    pos3.left = Math.round(pos3.left + 23);
    pos4.left = Math.round(pos4.left + 23);

    createLine( pos1, pos2, "hiw_line_01" );
    createLine( pos2, pos3, "hiw_line_02" );
    createLine( pos3, pos4, "hiw_line_03" );
  }
  drawLine();
  $(window).on("resize", function(){
    var svg = $("#hiw_lines")[0];
    while( svg.firstChild ) { svg.removeChild( svg.firstChild ); }
    drawLine();
  });
});
