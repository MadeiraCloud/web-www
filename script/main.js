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
            $li.eq(index).addClass('processing');
            $li.eq(eq).addClass('processing');
            if(index < eq){
                $li.eq(index).addClass('reverse');
                $li.eq(eq).addClass('reverse');
            }
            slideTimeout = window.setTimeout(function(){
                $li.removeClass('reverse');
                $li.eq(index).removeClass('processing').removeClass('active');
                $li.eq(eq).removeClass('processing').addClass('active');
                getStatus();
                console.log(count-1, index, next, previous);
            },timeout);
        }

        function slideNext(){
            slideInterval = window.setInterval(function(){
                getStatus();
                slideTo()
            }, timeout*4)
        }

        slideNext();

        $('.slider_pagination a').click(function(e){
            e.preventDefault();
            window.clearInterval(slideInterval);
            var targetIndex = $(e.currentTarget).index();
            slideTo(targetIndex);
            setTimeout(slideNext, 3000);
            return false;
        });

        $('.slider_navigation a').click(function(e){
            e.preventDefault();
            window.clearInterval(slideInterval);
            var target = $(e.currentTarget);
            getStatus();
            if(target.hasClass('left')){
                slideTo(previous);
            }
            if(target.hasClass('right')){
                slideTo(next);
            }
            setTimeout(slideNext, 3000);
            return false;
        })
    };
    slider({
        selector: ".slider_content",
        timeout: 1000
    });

    $(".index_banner").height($(window).height()-120);
    if ($(window).width() > 860) {
        skrollr.init();
    }

    window.setTimeout(function(){
        $('#slide-1').find('g#diagram').animate({'margin-left': 1}, {
            duration: 1000,
            step: function(value){
                var val = value; 
                $(this).attr('transform',"scale("+(val*0.84+1)+")translate(-"+(240*val)+","+(val*53)+")");
            }});
        window.setTimeout(function(){
            $("#slide-2").animate({opacity: 1}, {duration: 1000});
            $("#slide-1").animate({opacity: 0}, {duration: 1000});
        },1000);
        window.setTimeout(function(){
            $("#slide-3 > g").attr('transform','scale(2.45)translate(-198,-10)');
            $("#slide-3").animate({opacity: 0.5}, {duration: 1000});
            $("#slide-2").animate({opacity: 0}, {duration: 1000});
        }, 5000);
        window.setTimeout(function(){
            $("#slide-3").animate({opacity: 1}, {
                duration: 2000,
                step: function(value){
                    var val = (1- value)*2;
                    $('#slide-3 > g').attr('transform', 'scale('+(1+1.45*val)+')translate(-'+(198*val)+',-'+(val*10)+')');
                }
            });
        },6000);
        window.setTimeout(function(){
            $("#frame").animate({opacity: 1},{duration: 1000})
        },8000)
    },3000);

});
