
$(document).ready(function () {

    // ************* main page, header carousel ******** 
        var owl_header = $('.owl-carousel');
        // Listen to owl events:
        owl_header.on('changed.owl.carousel', function(event) {
            fix_size();
        });
        // setup carousel
        owl_header.owlCarousel({
            items: 1,
            loop: true,
            mouseDrag: false,
            dots: true,
            dotsEach: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
            });
        // custom controls 
    
            $('#owl-right').click(function() {
                owl_header.trigger('next.owl.carousel');
                return false;
            })
            // Go to the previous item
            $('#owl-left').click(function() {
                owl_header.trigger('prev.owl.carousel');
                return false;
            })
    // ************* product page, photo carousel **************
        var photo_carousel = $('.item-photo-carousel');
    
        photo_carousel.on('changed.photo_carousel.carousel', function(event) {
            fix_size();
        });
    
        photo_carousel.owlCarousel({
            items: 3
        });
    
        // custom controls 
    
        $('#arrow-dx').click(function() {
            photo_carousel.trigger('next.owl.carousel');
            return false;
        });
        // Go to the previous item
        $('#arrow-sx').click(function() {
            photo_carousel.trigger('prev.owl.carousel');
            return false;
        });
    
        $('.carousel-img-prev img').click(function(event) {
            $('.item-photo-active').empty();
            $(this).clone().appendTo('.item-photo-active');
            return false;
        });
    //************* recently products and also like scroller *********
        var product_scroller = $('.product-scroller');
         product_scroller.owlCarousel({
            items: 3,
            loop: true
        });
    
         $('.also-like .scroll-right').click(function() {
            $('.also-like .product-scroller').trigger('next.owl.carousel');
            return false;
        });
        // Go to the previous item
        $('.also-like .scroll-left').click(function() {
            $('.also-like .product-scroller').trigger('prev.owl.carousel');
            return false;
        });
    
         $('.recently-viewed .scroll-right').click(function() {
            $('.recently-viewed .product-scroller').trigger('next.owl.carousel');
            return false;
        });
        // Go to the previous item
        $('.recently-viewed .scroll-left').click(function() {
            $('.recently-viewed .product-scroller').trigger('prev.owl.carousel');
            return false;
        });
        //************* toogle active links ******
        var link_size = $('.size a');
    
        link_size.click(function(event) {
            if (!($(this).hasClass('active'))) {
                link_size.each(function(index, el) {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                return false;
            }
            return false;
        });
    
        var link_length= $('.length a');
    
        link_length.click(function(event) {
            if (!($(this).hasClass('active'))) {
                link_length.each(function(index, el) {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                return false;
            }
            return false;
        });
    
        //******* pagination **************
    
        var page = $('.pagination a');
    
        page.click(function(event) {
            if (!($(this).hasClass('active'))) {
                page.each(function(index, el) {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
            }
        });
        //********* resizing images  ****************
    
         fix_size();
    
         $(window).resize(function(){
                fix_size();
            });
    
        function fix_size() {
            var images = $('.img-sizer-container > img');
            images.each(setsize);
    
            function setsize() {
                var img = $(this),
                    img_dom = img.get(0),
                    container = img.parents('.img-sizer-container');
                if (img_dom.complete) {
                    resize();
                } else img.one('load', resize);
    
                function resize() {
                    if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                        img.width('auto');
                        img.height('100%');
                        return;
                    }
                    img.height('auto');
                    img.width('100%');
                }
            }
        }
    //********* stylizing custom placehonders ***************
        var text_field = $('.text-field');
    
        text_field.focusin(function(event) {
            $(this).next().css('display', 'none');
    
            $(this).focusout(function(event) {
                if ($(this).val() == '') {
                    $(this).next().css('display', 'block');
                }
            });
        });
    
    
        $('.clear-icon').click(function(event) {
            $('.search-field').val('');
            return false;
        });
    
    //********* Disable margin-left in earch right side item ******
        $('.home-page .item:nth-child(3n+1)').css('margin-right', '0');
        $('.shopcart .item:nth-child(3n+2)').css('margin-right', '0');
        $('.pagination ul li:last-child').css('margin-top', '2px');   
        // $('.pagination ul li:last-child').css('margin-top', '2px');   
    //********* breadcrumbs **************************
        $('.breadcrumbs li:last-child').addClass('no-arrow');
        $('.breadcrumbs li:last-child a').css('background-color', '#faef03');
    
    //*********** item photo carousel ***************
        $('.carousel-img-prev:last-child').css('margin-right', '0');
    //************ Quantity increment on product page *******
        var quantity = $('.quantity input');
    
        $('.quantity a').click(function(event) {
            quantity.val(+quantity.val()+1);
        });
    
        var dec = $('.qty span:first-child');
        var inc = $('.qty span:last-child');
    
        dec.click(function(event) {
            if (parseInt($(this).next().text()) > 0) {
                $(this).next().text((parseInt(parseInt($(this).next().text()))-1));
            }
        });
    
        inc.click(function(event) {
             $(this).prev().text((parseInt(parseInt($(this).prev().text()))+1));
        });
        
    //************** tabs *******************
        $( "#tabs" ).tabs();
    //*************** select menu *********
        $( ".sort-by" ).selectmenu();
        $( ".count" ).selectmenu();
    //************* stylizing checkbox *******
        var check_btn = $('.checkbox-wrapper label');
    
        check_btn.click(function() {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $(this).prev().prop('checked', false);
            }
            else {
                $(this).prev().prop('checked', true);
            }
        });
        
         $('.cbalink').empty();// удаление рекламы с сайта на бесплатном хостинге
    });