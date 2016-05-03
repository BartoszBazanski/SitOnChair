var main = function(){
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
    aboutUs.click(function(){
        $(this).siblings('.sub-menu').slideToggle();
    });
    var imageBoxes = $('.box12');
    imageBoxes.on('mouseover', function(){
        $(this).children('.panel').fadeOut('fast');
    });
    imageBoxes.on('mouseout',function(){
        $(this).children('.panel').fadeIn('fast');
    });
    arrowRight.click(function(){
        slideLeft(slides);
    })
    arrowLeft.click(function(){
        slideRight(slides);
    })
    //Compose your chair
    //Dropdown lists
    var dropdownBlueArrows = $('.dropdown').find('.blue-arrow');
    dropdownBlueArrows.click(function(){
        $(this).closest('dt').siblings('dd').slideToggle('fast');
    });
    var chairPick = $('#chair-pick');
    var colorPick = $('#color-pick');
    var fabricPick = $('#fabric-pick');
    var transportPick = $('#transport');
    function autoSumCost(){
        var chairSum = $('#chair-sum');
        var chairPrice = parseInt($('#chair-price').text(), 10) || 0;
        var colorPrice = parseInt($('#color-price').text(), 10) || 0;
        var fabricPrice = parseInt($('#fabric-price').text(), 10) || 0;
        var transportPrice = parseInt($('#transport-price').text(), 10) || 0;
        var sum = chairPrice + colorPrice + fabricPrice + transportPrice;
        chairSum.text(sum);
    }
    fabricPick.find('li').click(function(){
        var option = $(this).data().fabric;
        var price = $(this).data().fabricPrice;
        $(this).closest('dl').find('dt span').text(option).css('color', 'black');
        $('#chair-fabric').text(option);
        $('#fabric-price').text(price);
        autoSumCost();
        $(this).closest('dd').slideToggle('fast');
    })
    colorPick.find('li').click(function(){
        var option = $(this).data().color;
        var price = $(this).data().colorPrice;
        $(this).closest('dl').find('dt span').text(option).css('color', 'black');
        $('#chair-color').text(option);
        $('#color-price').text(price);
        autoSumCost();
        $(this).closest('dd').slideToggle('fast');
    })
    chairPick.find('li').click(function(){
        var option = $(this).data().chair;
        var price = $(this).data().chairPrice;
        $(this).closest('dl').find('dt span').text(option).css('color', 'black');
        $('#chair-name').text(option);
        $('#chair-price').text(price);
        autoSumCost();
        $(this).closest('dd').slideToggle('fast');
    })
    transportPick.click(function(){
        if($(this).is(':checked')){
            $('#transport-yes p').show();
            $('#transport-price').text($(this).data().transportPrice);
        } else {
            $('#transport-yes p').hide();
            $('#transport-price').text("");
        }
        autoSumCost();
    })
};
$(document).ready(main);