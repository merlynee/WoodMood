/**
 * Created by Administrator on 2016/6/14.
 */
$(function () {
    var offset = $('.navbar-fixed-top').outerHeight()
    $('.body_content').offset({top:offset,left:0})

    // alert($('.navbar-collapse .container:first').css("margin-left"))
    var head = $('.navbar-header')
    var navbarFirstMarginLeft = parseInt( $('.navbar-collapse .container:first').css("margin-left"))
    var head_padding = navbarFirstMarginLeft - head.innerWidth();
    head.css({"margin-left" : head_padding})
})