$(function () {
    "use strict";
    var currentURL = document.URL;

    if (currentURL && currentURL.indexOf('/#redirect') !== -1) {
        $('body').addClass('redirected');
    }

    function onWinScroll() {
        $("#mcHeader").toggleClass("sticky", scrollY > 0)
    }

    $(window).on("scroll", onWinScroll);


    var slider = function (options) {
        var selector = options.selector;
        var timeout = options.timeout || 300;
        var $slider = $(selector);
        var $li = $slider.find('li');
        $li.eq(0).addClass('active');
        var index , count, next, previous, slideInterval, slideTimeout;

        function getStatus(){
            index = $slider.find("li.active").index() || 0;
            count = $slider.find('li').size();
            next = (index == count -1) ? 0 : index +1;
            previous = (index == 0)? (count -1) : (index -1);
        }

        function slideTo(eq){
            eq = $.isNumeric( eq )? eq : next;
            $('.slider_pagination a').removeClass('active').eq(eq).addClass('active');
            if(index < eq){
                $li.eq(index).addClass('processing').stop().animate({"margin-left": '-100%'}, {duration: timeout,done:function(){$(this).css({'margin-left': 0});}});
                $li.eq(eq).addClass('processing').css({'margin-left': "100%"}).stop().animate({"margin-left": 0},{duration: timeout});
            }else{
                $li.eq(index).addClass('processing').stop().animate({"margin-left": '100%'}, {duration: timeout,done:function(){$(this).css({'margin-left': 0});}});
                $li.eq(eq).addClass('processing').css({'margin-left': "-100%"}).stop().animate({"margin-left": 0},{duration: timeout});
            }
            slideTimeout = window.setTimeout(function(){
                $li.removeClass('reverse');
                $li.eq(index).removeClass('processing').removeClass('active');
                $li.eq(eq).removeClass('processing').addClass('active');
                getStatus();
            },timeout);
        }

        function slideNext(){
            window.slideInterval = window.setInterval(function(){
                getStatus();
                slideTo()
            }, timeout*4)
        }

        slideNext();

        $('.slider_pagination a').click(function(e){
            e.preventDefault();
            window.clearInterval(window.slideInterval);
            if (window.setTimer){
                window.clearTimeout(window.setTimer);
            }
            var targetIndex = $(e.currentTarget).index();
            slideTo(targetIndex);
            window.setTimer = setTimeout(slideNext, timeout*4+2000);
            return false;
        });

        $('.slider_navigation a').click(function(e){
            e.preventDefault();
            window.clearInterval(window.slideInterval);
            if (window.setTimer){
                window.clearTimeout(window.setTimer);
            }
            var target = $(e.currentTarget);
            getStatus();
            if(target.hasClass('left')){
                slideTo(previous);
            }
            if(target.hasClass('right')){
                slideTo(next);
            }
            window.setTimer = setTimeout(slideNext, timeout*4+2000);
            return false;
        })
    };
    slider({
        selector: ".slider_content",
        timeout: 800
    });

    $(".index_banner").height($(window).height()-120);
    if ($(window).width() > 860) {
        skrollr.init();
    }

    function a_b(){
        activeEq(1);
        zoomInSlide1();
        window.setTimeout(fadeInSlide2, 1000);
    }
    function b_c(){
        activeEq(2);
        window.setTimeout(fadeInSlide3, 0);
        window.setTimeout(zoomOutSlide3, 1000);
        window.setTimeout(fadeInFrame, 3000);
        window.setTimeout(fadeInGears, 3500);
    }
    function c_b(){
        activeEq(1);
        setTimeout(function(){fadeInFrame(true)}, 0);
        setTimeout(function(){fadeInGears(true)}, 500);
        setTimeout(function(){zoomOutSlide3(true)}, 2500);
        setTimeout(function(){fadeInSlide3(true)}, 3500);
    }

    function b_a(){
        activeEq(0);
        fadeInSlide2(true);
        window.setTimeout(function(){zoomInSlide1(true)}, 1000)
    }

    function zoomInSlide1(reverse){
        var marginLeft = reverse? 0 : 1;
        $('#slide-1').find('g#diagram').stop().animate(
            {'margin-left': marginLeft}, {
                duration: 1000,
                step: function(value){
                    var val = value;
                    $(this).attr('transform',"scale("+(val*0.84+1)+")translate(-"+(240*val)+","+(val*53)+")");
                }
            }
        );
    }

    function fadeInSlide2(reverse) {
        var opacity = reverse ? 0: 1;
        var opacity2 = reverse? 1: 0;
        $("#slide-2").stop().animate({opacity: opacity}, {duration: 1000});
        $("#slide-1").stop().animate({opacity: opacity2}, {duration: 1000});
    }


    function fadeInSlide3(reverse){
        var opacity = reverse ? 0: 0.5;
        var opacity2 = reverse? 1: 0;
        $("#slide-3 > g").attr('transform','scale(2.45)translate(-198,-10)');
        $("#slide-3").stop().animate({opacity: opacity}, {duration: 1000});
        $("#slide-2").stop().animate({opacity: opacity2}, {duration: 1000});
    }

    function zoomOutSlide3(reverse){
        var opacity = reverse ? 0.5: 1;
        $("#slide-3").stop().animate({opacity: opacity}, {
            duration: 2000,
            step: function(value){
                var val = reverse? (1-value)*2 : (1- value)*2;
                $('#slide-3 > g').attr('transform', 'scale('+(1+1.45*val)+')translate(-'+(198*val)+',-'+(val*10)+')');
            }
        });
    }

    function fadeInFrame(reverse){
        var opacity = reverse? 0: 1;
        $("#frame").stop().animate({opacity: opacity},{duration: 1000});
    }

    function fadeInGears(reverse){
        var opacity = reverse? 0 : 1;
        console.log(opacity);
        $(".gears svg").stop().animate({opacity: opacity},{duration: 1000});
    }

    function activeEq(eq){
        console.log(eq);
        $(".svg-control .circle").removeClass('active').eq(eq).addClass('active');
    }

    $(".svg-control .circle").click(function(event){
        window.clearTimeout(startAnimate);
        var target = $(event.currentTarget);
        var index = target.index();
        if(target.hasClass('active')){
            console.log('Return ');
            return false;
        }
        var active = target.parent().find('.active').index();
        if (index == 0 && active == 1){
            b_a();
        }
        if (index == 0 && active == 2){
            c_b();
            setTimeout(b_a, 6000)
        }
        if( index == 1 && active == 2){
            c_b();
        }
        if( index ==2 && active == 1){
            b_c();
        }
        if( index == 2 && active == 0){
            a_b();
            setTimeout(b_c, 4000);
        }
        if(index ==1 && active == 0){
            a_b()
        }
    });

    window.setTimeout(a_b, 3000);
    window.startAnimate = window.setTimeout(b_c, 7000);
});
