$(function () {
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


    function resetAnimation(){
        $("svg").fadeOut(500, function(){
            $("#slide-3>#state,#slide-1>#diagram").removeAttr("transform").removeAttr("style");
            $("#frame").removeAttr("style");
            $("svg").removeAttr("style").hide();
            $('svg').fadeIn(500, function(){
                startAnimation();
            })
        });

    }

    function startAnimation(){
        window.setTimeout(function(){
            $('#slide-1').find('g#diagram').stop().animate({'margin-left': 1}, {
                easing: "linear",
                duration: 1000,
                step: function(value){
                    var val = value;
                    if(val <= 0){return false}
                    console.log(val);
                    $(this).attr('transform',"scale("+(val*0.84+1)+")translate(-"+(240*val)+","+(val*53)+")");
                }});
            window.setTimeout(function(){
                $(".svg-control .circle").removeClass('active').eq(1).addClass("active");
                $("#slide-2").stop().animate({opacity: 1}, {duration: 1000});
                $("#slide-1").stop().animate({opacity: 0}, {duration: 1000});
            },1300);
            window.setTimeout(function(){
                $("#slide-3 > g").attr('transform','scale(2.45)translate(-198,-10)');
                $("#slide-3").stop().animate({opacity: 0.5}, {duration: 1000});
                $("#slide-2").stop().animate({opacity: 0}, {duration: 1000});
            }, 5000);
            window.setTimeout(function(){
                $(".svg-control .circle").removeClass('active').eq(2).addClass("active");
                $("#slide-3").stop().animate({opacity: 1}, {
                    duration: 1500,
                    easing: "linear",
                    step: function(value){
                        var val = (1- value)*2;
                        //console.log(val);
                        if(val>1){return false}
                        $('#slide-3 > g').attr('transform', 'scale('+(1+1.45*val)+')translate(-'+(198*val)+',-'+(val*10)+')');
                    }
                });
            },6000);
            window.setTimeout(function(){
                $("#frame").stop().animate({opacity: 1},{duration: 1000});
            },8000);
            window.setTimeout(function(){
                $(".gears svg").stop().animate({opacity: 1},{duration: 1000});
            },8500);
            window.setTimeout(function(){
                $(".replay").fadeIn(1000);
            },12000)
        },3000);
    }

    startAnimation();

    $(".replay").click(function(){
        resetAnimation();
        $(this).fadeOut(1000);
    })

});
