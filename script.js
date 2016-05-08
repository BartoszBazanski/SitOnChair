$(function(){
    var aboutUs = $('li a.about');
    var arrowRight = $('.arrow-right');
    var arrowLeft = $('.arrow-left');
    var slides = $('.slide');
    slides.siblings('.current').css({
        left: "0"
    })
    slides.siblings('.slide:not(.current)').css({
        left: "100%",
        opacity: "0"
    })

    // Slider

    function slideLeft(element){
        var currentSlide = element.siblings('.current');
        element.siblings('.slide:not(.current)').css({
            left: "100%",
            opacity: "0"
        })
        currentSlide.animate({
                left: "-100%",
                opacity: "0"
            }, 1000);
        if(currentSlide.is(element.last())){
            currentSlide.removeClass('current');
            element.first().animate({
                left: "0",
                opacity: "1"
            }, 1000).addClass('current');
        } else {
            currentSlide.removeClass('current');
            currentSlide.next().animate({
                left: "0",
                opacity: "1"
            }, 1000).addClass('current');
        }
    }
    function slideRight(element){
        var currentSlide = element.siblings('.current');
        element.siblings('.slide:not(.current)').css({
            left: "-100%",
            opacity: "0"
        })
        currentSlide.animate({
            left: "100%",
            opacity: "0"
        }, 1000);
        if(currentSlide.is(element.first())){
            currentSlide.removeClass("current");
            element.last().animate({
                left: "0",
                opacity: "1"
            }, 1000).addClass("current");
        } else {
            currentSlide.removeClass("current");
            currentSlide.prev().animate({
                left: "0",
                opacity: "1"
            }, 1000).addClass("current");
        }
    }
    arrowRight.click(function(){
        slideLeft(slides);
    })
    arrowLeft.click(function(){
        slideRight(slides);
    })

    //Dropdown in navigation

    aboutUs.click(function(){
        $(this).siblings('.sub-menu').slideToggle();
    });

    //Compose your chair
    //Option prices
    var prices = {
        chair: [1200, 1000, 750],
        color: [50, 75, 100],
        fabric: [250, 350],
        transport: 500
    }
    var colorPick = $('#color-pick').get(0);
    var fabricPick = $('#fabric-pick').get(0);
    var transportPick = $('#transport');
    function autoSumCost(){
        var chairSum = $('.sum-value');
        var chairPrice = parseInt($('.chair.value').text(), 10) || 0;
        var colorPrice = parseInt($('.color.value').text(), 10) || 0;
        var fabricPrice = parseInt($('.fabric.value').text(), 10) || 0;
        var transportPrice = parseInt($('.transport.value').text(), 10) || 0;
        var sum = chairPrice + colorPrice + fabricPrice + transportPrice;
        chairSum.text(sum);
    }
    function updateOnSelection(select){
        $("#" + select + "-pick").change(function(){
            var options = $(this).get(0).options;
            var optionIndex = $(this).get(0).selectedIndex;
            var price = prices[select][optionIndex - 1];
            $("." + select + ".option").text(options[optionIndex].text);
            $("." + select + ".value").text(price);
            autoSumCost();
        });
    }
    updateOnSelection("chair");
    updateOnSelection("color");
    updateOnSelection("fabric");
    transportPick.click(function(){
        if($(this).is(':checked')){
            $('.transport.option').text('Transport');
            $('.transport.value').text(prices.transport);
        } else {
            $('.transport.option').text('');
            $('.transport.value').text('');
        }
        autoSumCost();
    })
});
