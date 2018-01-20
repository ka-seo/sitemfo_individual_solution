$(document).ready(function(){
    setTimeout(function () {
        $('.portfolio').fadeIn();
    }, 300);

    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        let scrolled = $(window).scrollTop();
        $(".parallax-1").css('top', ( 100 - scrolled / 13 ) + 'px');
        $(".parallax-2 .img-1").css('top', ( 280 - scrolled / 10 ) + 'px' );
        $(".parallax-2 .img-2").css('top', ( -280 + scrolled / 10 ) + 'px' );
        $(".parallax-3").css('top', ( 150 - scrolled / 9 ) + 'px');
    }
});

