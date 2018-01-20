$('.top-bar__text--mobile').on('click', function (e) {
    e.preventDefault();
    $(this).hide();
    $('body').addClass('panel-open');
    $('.top-bar__form').slideToggle('fast');
});

$('.top-bar__form_close').on('click', function (e) {
    e.preventDefault();

    $('body').removeClass('panel-open');

    $(this).closest('form').slideUp('fast');
    $('.top-bar__text--mobile').show(0);
});

/********************************
 * INPUT MASK
 *********************************/
$("input[name='phone'], input[name='bar_phone']").inputmask(
    "+7 (999) 999-99-99",
    {
        clearIncomplete: true,
        showMaskOnHover: false,
        "onincomplete": function () {
            $(this).removeClass('valid').addClass('error');
        }
    });


$.extend( $.validator.messages, {
    required: "Необходимо заполнить.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры."
} );

$.validator.addMethod("phoneField", function(value, element) {
    return this.optional(element) || /^[0-9-+() ]+$/.test(value);
}, "Укажите корректный номер.");

/********************************************
 VALIDATION TOP DEMO FORM
 ********************************************/
function formSend(form, icon) {
    var sent = $(form).find('.sent'),
        defaulting = $(form).find('.default'),
        loading = $(form).find('.loading'),
        errorElem = $(form).find('.error-send'),
        pathObj_1 = {
            "sent-1": {
                "strokepath": [{
                    "path": "M26.395 14.319A13.025 13.025 0 0 1 4.928 23.37 13.023 13.023 0 0 1 13.398.454a12.98 12.98 0 0 1 5.009.998m-11.024 9.02l6.01 7.012 11.345-11.8",
                    "duration": 1000
                }],
                "dimensions": {
                    "width": 30,
                    "height": 30
                }
            }
        },
        pathObj_2 = {
            "sent-2": {
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


    // на экран сообщение с данными, присланными сервером.
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

                $('#sent-1').lazylinepainter({
                    "svgData": pathObj_1,
                    "strokeWidth": 2,
                    "strokeColor": "#fff"
                }).lazylinepainter('paint');

                setTimeout(function () {
                    sent.hide();
                    errorElem.hide();
                    defaulting.fadeIn();

                    $('body').removeClass('panel-open');
                    $('.panel-float').hide().addClass('hidden');
                    $('.fixed-panel').hide().addClass('hidden');

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


/********************************************
 VALIDATION TOP DEMO FORM
 ********************************************/
$("#bar-form").validate({
    errorElement: "span",
    submitHandler: function(form) {
        formSend(form, 'sent-1')
    }
});
