function floatBtnPanel(btn, idStart, offsetStart, idEnd, offsetEnd) {
    var windowPos = $(window).scrollTop();

    if($('body').find(idStart).length > 0 || $('body').find(idEnd).length > 0) {
        if(idEnd && offsetEnd) {
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
        floatBtnPanel('.panel-float', '#feature', 501, '.form-order', -600);
        $('.panel-float').removeClass('bounceInUp').addClass('bounceInRight');
        // console.log('LOAD 1200');
    }
    else if(ww > 768 && ww < 992) {
        floatBtnPanel('.panel-float', '#feature', 501, '.form-order', -750);
        $('.panel-float').removeClass('bounceInRight').addClass('bounceInUp');
        // console.log('LOAD 992');
    }
    else if(ww < 768) {
        floatBtnPanel('.panel-float', '#feature', 502, '.form-order', -900);
        $('.panel-float').removeClass('bounceInRight').addClass('bounceInUp');
        // console.log('LOAD < 768');
    }
    else {
        floatBtnPanel('.panel-float', '#feature', 153, '.form-order', -550);
        $('.panel-float').removeClass('bounceInUp').addClass('bounceInRight');
        // console.log('LOAD OTHER');
    }

});

$('.panel-float__button').on('click', function (e) {
    e.preventDefault();
    var _this = $(this);
    var panel = $('.panel-float__popup');

    $('body').addClass('panel-open');

    _this.hide();
    panel.slideDown(300);
});

$('.popup__close').on('click', function (e) {
    e.preventDefault();
    var _this = $(this);
    var panel = $('.panel-float__popup');
    var btn = $('.panel-float__button');

    $('body').removeClass('panel-open');

    btn.show();
    panel.hide();
});

$('#form-order-floating').validate({
    errorElement: 'div',
    submitHandler: function submitHandler(form, e) {
        e.preventDefault();

        var sent = $(form).find('.sent'),
            defaulting = $(form).find('.default'),
            loading = $(form).find('.loading'),
            errorElem = $(form).find('.error-send'),
            pathObj = {
                "sent-float": {
                    "strokepath": [{
                        "path": "M26.395 14.319A13.025 13.025 0 0 1 4.928 23.37 13.023 13.023 0 0 1 13.398.454a12.98 12.98 0 0 1 5.009.998m-11.024 9.02l6.01 7.012 11.345-11.8",
                        "duration": 1000
                    }],
                    "dimensions": {
                        "width": 30,
                        "height": 30
                    }
                }
            };

        $.ajax({
            type: "POST",
            url: 'send-2.php',
            data: $(form).serializeArray(),
            beforeSend: function beforeSend() {
                console.log('Try sending the form...');

                $(form).find(':input').prop('readonly', true);
                $(form).find(':button').prop('disabled', true);
                //$(form).find('select').prop('disabled', true);

                defaulting.hide();
                loading.show();



            },
            success: function success(response) {
                console.info('Got response success');

                if (response == 'success') {
                    console.log('Form was sent success');
                    loading.hide();
                    defaulting.hide();
                    errorElem.hide();
                    sent.fadeIn();

                    $('#sent-float').lazylinepainter({
                        "svgData": pathObj,
                        "strokeWidth": 2,
                        "strokeColor": "#fff"
                    }).lazylinepainter('paint');

                    setTimeout(function () {
                        sent.hide();
                        errorElem.hide();
                        defaulting.fadeIn();

                        $('body').removeClass('panel-open');
                        $('.panel-float__popup').hide().addClass('hidden');
                        $('.panel-float__button').hide().addClass('hidden');

                        $(form).find(':input').prop('readonly', false);
                        $(form).find(':button').prop('disabled', false);
                        $(form)[0].reset();
                    }, 3000);
                }

                if (response == 'error') {
                    console.error('Form was sent error');
                    console.log(response);
                    loading.hide();
                    defaulting.hide();
                    sent.hide();
                    errorElem.fadeIn();

                    setTimeout(function () {
                        loading.hide();
                        defaulting.hide();
                        sent.hide();
                        defaulting.fadeIn();

                        $(form).find(':input').prop('readonly', false);
                        $(form).find(':button').prop('disabled', false);
                        //$(form).find('select').prop('disabled', false);
                        $(form)[0].reset();
                    }, 4000);
                    alert('К сожалению, по какой-то причине ваше письмо не отправлено. Пожалуйста, повторите попытку.');
                }
            },
            error: function error(response) {
                console.error('Error sending form.');
                console.log(response);
                loading.hide();
                defaulting.hide();
                sent.hide();
                errorElem.fadeIn();

                setTimeout(function () {
                    loading.hide();
                    sent.hide();
                    errorElem.hide();
                    defaulting.fadeIn();

                    $(form).find(':input').prop('readonly', false);
                    $(form).find(':button').prop('disabled', false);
                    $(form)[0].reset();
                }, 4000);
            }
        });
    }
});
