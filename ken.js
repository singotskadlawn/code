$(document).ready(function() {
    var toggle_primary_button = $(".nav_toggle_button"),
        toggle_primary_icon = $(".nav_toggle_button i"),
        toggle_secondary_button = $(".page_nav li span"),
        primary_menu = $(".page_nav"),
        secondary_menu = $(".page_nav ul ul"),
        webHeight = $(document).height(),
        window_width = $(window).width(),
        form,
        hamburger;

    function swap_this() {
        window_width >= 1200 ? $("main").insertBefore("aside") : $("main").insertAfter("aside");
        window_width <= 1000 ? ($(".footer_btm_left").insertAfter(".footer_btm_right"), $(".social_media").insertAfter(".header_info")) : ($(".footer_btm_right").insertAfter(".footer_btm_left"), $(".social_media").insertAfter(".headernav"));
        window_width <= 800 ? ($(".main_logo").insertAfter(".logo_wrap"), $("#nav_area").insertBefore("header")) : ($(".main_logo").insertBefore(".head_info"), $("#nav_area").insertAfter("header"));
        window_width <= 600 ? $(".copyright").insertAfter(".footer_sitem") : $(".copyright").insertAfter(".footer_logo a");
    }

    $("main * :not('h1')").not(".woocommerce *").each(function() {
        var regex1 = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6})/g,
            regex2 = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{4}[\s.-]?\d{4})/g,
            regex = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;

        $(this).html($(this).html().replace(/My Neighbor Pharmacy/g, "<mark class='comp'>$&</mark>")
		.replace(regex1, "<mark class='main_phone'>$&</mark>")
		.replace(regex2, "<mark class='main_phone'>$&</mark>")
		.replace(regex, "<mark class='main_phone'>$&</mark>"));
    });

    $("main a[href]").each(function() {
        var newHref = $(this).attr("href").replace("<mark class='comp'>", "").replace("</mark>", "");
        $(this).attr("href", newHref);
    });

    $("main").find("#myframe").length > 0 && (document.getElementById("myframe").onload = function() {
        calcHeight();
    });

    $(".page_nav li:has(ul)").find("span i").addClass("fa-caret-down");

    toggle_secondary_button.click(function() {
        $(this).parent("li").siblings("li").children("ul").slideUp(400, function() {
            $(this).removeAttr("style");
        });
        $(this).parent("li").siblings("li").find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(this).parent("li").children("ul").slideToggle();
        $(this).children().toggleClass("fa-caret-up").toggleClass("fa-caret-down");
    });

    $(".hamburger").click(function() {
        primary_menu.addClass("toggle_right_style");
        $(".toggle_right_nav").addClass("toggle_right_cont");
        $(".nav_toggle_button").toggleClass("active");
        $(".hamburger").toggleClass("is-active");
        $("body").addClass("active");
    });

    $(".toggle_nav_close, .menu_slide_right .hamburger").click(function() {
        primary_menu.removeClass("toggle_right_style");
        $(".toggle_right_nav").removeClass("toggle_right_cont");
        $(".nav_toggle_button").removeClass("active");
        $(".hamburger").removeClass("is-active");
        $("body").removeClass("active");
    });

    swap_this();

    $(window).resize(function() {
        window_width = $(this).width();
        swap_this();
        if (window_width > 800) {
            $(".nav_toggle_button").removeClass("active");
            $(".hamburger").removeClass("is-active");
            secondary_menu.removeAttr("style");
            toggle_secondary_button.children().removeClass("fa-caret-up").addClass("fa-caret-down");
            primary_menu.removeClass("toggle_right_style");
            $(".toggle_right_nav").removeClass("toggle_right_cont");
            $("body").removeClass("active");
        }
    });

    $(".rslides").responsiveSlides();

    $(".box_skitter_large").skitter({
        theme: "minimalist",
        numbers_align: "center",
        progressbar: !1,
        navigation: !1,
        numbers: !1,
        dots: !1,
        preview: !0,
        interval: 3000
    });

    $(".back_top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 900);
        return !1;
    });

    $(window).scroll(function() {
        var windowScroll = $(this).scrollTop();
        windowScroll > 0.5 * webHeight && window_width <= 600 ? $(".back_top").fadeIn() : $(".back_top").fadeOut();
        if (window_width <= 1000) {
            $(".slider").css("top", 0);
        } else {
            $(".slider").css("top", 0.4 * windowScroll + "px");
            windowScroll >= 100 ? $(".parentheadnav").addClass("fadeInDown") : $(".parentheadnav").removeClass("fadeInDown");
        }

        if ($("body #at-share-dock").hasClass("at-share-dock")) {
            $(".back_top").addClass("withAddThis_plugins");
            $(".footer_btm").addClass("withAddThis_ftr_btm");
        } else {
            $(".back_top").removeClass("withAddThis_plugins");
            $(".footer_btm").removeClass("withAddThis_ftr_btm");
        }

        if (windowScroll >= 100) {
            $(".parentheadnav").addClass("fixedHeadNav");
            $(".social_media").addClass("fixedSocial");
        } else {
            $(".parentheadnav").removeClass("fixedHeadNav");
            $(".social_media").removeClass("fixedSocial");
        }
    });

    $(".commentlist li:last-child").css("background", "none");
    $(".commentlist li ul li").css("background", "none");
    $(".commentlist li ul li:last-child").css("border-bottom", "none");
    $(".modal").css("display", "flex").hide().fadeIn(500);
    $(".close-btn").click(function() {
        $(".modal").fadeOut(500);
    });
});
