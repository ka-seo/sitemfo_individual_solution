function floatNotify(btn, idStart, offsetStart, idEnd, offsetEnd) {
    var windowPos = $(window).scrollTop();

    if($('body').find(idStart).length > 0 || $('body').find(idEnd).length > 0) {
        if (idEnd && offsetEnd) {
            if (windowPos >= ($(idStart).offset().top - offsetStart) && windowPos <= ($(idEnd).offset().top + offsetEnd)) {
                $(btn).show();
                // console.log('START SHOW:', $(idStart).offset().top + ' - ' + offsetStart + ' = ', $(idStart).offset().top - offsetStart);
            } else {
                $(btn).hide();
                // console.log('START END:', $(idEnd).offset().top + ' - ' + offsetEnd + ' = ', $(idEnd).offset().top + offsetEnd);
            }
        }
        else {
            // console.log('windowPos:' + windowPos, 'offset:' + $(idStart).offset().top - offsetStart, 'offset size: ' + offsetStart);
            if (windowPos >= ($(idStart).offset().top - offsetStart)) {
                $(btn).show();
                // console.log('START SHOW:', $(idStart).offset().top + ' - ' + offsetStart + ' = ', $(idStart).offset().top - offsetStart);
            } else {
                $(btn).hide();
                // console.log('end');
            }
        }
    }
}

$(window).bind('load resize orientationchange scroll', function() {
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    if(ww > 1200) {
        floatNotify('.notification', '#portfolio-container', 500);
        $('.notification').removeClass('bounceInUp').addClass('bounceInLeft');
        // console.log('LOAD 1200');
    }
    else if(ww > 768 && ww < 992) {
        floatNotify('.notification', '#portfolio-container', 500);
        $('.notification').removeClass('bounceInLeft').addClass('bounceInUp');
        // console.log('LOAD 992');
    }
    else if(ww < 768) {
        floatNotify('.notification', '#portfolio-container', 500);
        $('.notification').removeClass('bounceInLeft').addClass('bounceInUp');
        // console.log('LOAD < 768');
    }
    else {
        floatNotify('.notification', '#portfolio-container', 553);
        $('.notification').removeClass('bounceInUp').addClass('bounceInLeft');
        // console.log('LOAD OTHER');
    }

});

$(window).bind('orientationchange resize load', function() {
    var ww = window.innerWidth;

    if(ww > 992) {
        $('.notification__close').on('click', function (e) {
            e.preventDefault();
            var that = $(this);

            that.parent().removeClass('bounceInLeft').addClass('bounceOutLeft');

            setTimeout(function () {
                that.parent().removeClass('bounceOutLeft animation').addClass('hidden').hide();
            }, 1000);
        });

    }
    else {
        $('.notification__close').on('click', function (e) {
            e.preventDefault();
            var that = $(this);

            that.parent().removeClass('bounceInUp').addClass('bounceOutDown');

            setTimeout(function () {
                that.parent().removeClass('bounceOutDown animation').addClass('hidden').hide();
            }, 1000);
        });

    }
});


