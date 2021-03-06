/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.1
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

jQuery.extend(jQuery.validator.messages, {
    required: "Заполните, пожалуйста, это поле",
    email: "Введите правильный email",
    number: "Введите правильный номер телефона"
});


var app = app || {};
app.events = {
    init: function() {
        this.tile();
        this.sliderHome();
        this.map();
        this.formValidate();
        this.lightbox();
        this.serviceDetail();
    },
    tile: function () {
        var $tile = $('.tile');
        if ($(window).width() > 1024) {
            $tile.each(function (i, item) {
                $(item).css('height', $(item).width());
            })
        } else {
            console.log('else');
            $tile.css('height', 'auto');
        }
    },
    sliderHome: function () {
        var $flexslider = $('.flexslider');
        if ($flexslider.length > 0) {
            $flexslider.flexslider({
                animation: "slide",
                slideShow: true,
                prevText: '',
                nextText: '',
                controlsContainer: $('.custom-controls-container'),
                customDirectionNav: $('.custom-navigation a')
            });
        }
    },
    map: function () {
        var $map = $('#map');
        if ($map.length > 0) {
            var map;
            DG.then(function () {
                map = DG.map('map', {
                    center: [43.15, 131.91],
                    zoom: 18
                });
                DG.marker([43.15, 131.91]).addTo(map);
            });
        }
    },
    formValidate: function () {
        $('input[name="phone"]').mask("+7 (999) 999-9999");

        $('.modal-form-get-advice').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true
                },
                message: {
                    required: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var $form = $(form),
                    $btn = $form.find('.btn-form'),
                    $preloader = $form.find('.preloader'),
                    $messageSuccess = $form.find('.message.success'),
                    $messageError = $form.find('.message.error');
                $btn.css('opacity', 0);
                $preloader.fadeIn();
                $messageSuccess.hide();
                $messageError.hide();

                /* удалить. это просто "демо" прелоадера) */
                setTimeout(function () {
                    $preloader.fadeOut();
                    $btn.css('opacity', 1);
                    //$messageSuccess.fadeIn();
                    $messageError.fadeIn();
                }, 2000);
                /* удалить */

                /*$.ajax({
                    url: 'url',
                    success: function(data) {
                        if (data.status = 'success') {
                            //  success message
                            $messageSuccess.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        } else {
                            console.log('failure');
                            console.log(data);
                            //  error message
                            $messageError.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        }
                    },
                    error: function (data) {
                        console.log('error');
                        console.log(data);
                        //  error message
                        $messageError.fadeIn();
                        $preloader.fadeOut();
                        $btn.css('opacity', 1);
                    }
                })*/
            }
        });

        $('.form-ask-question').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true
                },
                message: {
                    required: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var $form = $(form),
                    $btn = $form.find('.btn-form'),
                    $preloader = $form.find('.preloader'),
                    $messageSuccess = $form.find('.message.success'),
                    $messageError = $form.find('.message.error');
                $btn.css('opacity', 0);
                $preloader.fadeIn();
                $messageSuccess.hide();
                $messageError.hide();

                /* удалить. это просто "демо" прелоадера) */
                setTimeout(function () {
                    $preloader.fadeOut();
                    $btn.css('opacity', 1);
                    $messageSuccess.fadeIn();
                    //$messageError.fadeIn();
                }, 2000);
                /* удалить */

                /*$.ajax({
                    url: 'url',
                    success: function(data) {
                        if (data.status = 'success') {
                            //  success message
                            $messageSuccess.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        } else {
                            console.log('failure');
                            console.log(data);
                            //  error message
                            $messageError.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        }
                    },
                    error: function (data) {
                        console.log('error');
                        console.log(data);
                        //  error message
                        $messageError.fadeIn();
                        $preloader.fadeOut();
                        $btn.css('opacity', 1);
                    }
                });*/
            }
        });
        $('.modal-form-callback').validate({
            rules: {
                name: {
                    required: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var $form = $(form),
                    $btn = $form.find('.btn-form'),
                    $preloader = $form.find('.preloader'),
                    $messageSuccess = $form.find('.message.success'),
                    $messageError = $form.find('.message.error');
                $btn.css('opacity', 0);
                $preloader.fadeIn();
                $messageSuccess.hide();
                $messageError.hide();

                /* удалить. это просто "демо" прелоадера) */
                setTimeout(function () {
                    $preloader.fadeOut();
                    $btn.css('opacity', 1);
                    $messageSuccess.fadeIn();
                    //$messageError.fadeIn();
                }, 2000);
                /* удалить */

                /*$.ajax({
                    url: 'url',
                    success: function(data) {
                        if (data.status = 'success') {
                            //  success message
                            $messageSuccess.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        } else {
                            console.log('failure');
                            console.log(data);
                            //  error message
                            $messageError.fadeIn();
                            $preloader.fadeOut();
                            $btn.css('opacity', 1);
                        }
                    },
                    error: function (data) {
                         console.log('error');
                         console.log(data);
                         //  error message
                         $messageError.fadeIn();
                         $preloader.fadeOut();
                         $btn.css('opacity', 1);
                    }
                });*/
            }
        });
    },
    lightbox: function () {
        if ( $('[data-lightbox]').length > 0 ) {
            lightbox.option({
                alwaysShowNavOnTouchDevices: true,
                albumLabel: '',
                wrapAround: true
            })
        }
    },
    serviceDetail: function () {
        var $servDetTable = $('.serv-det-table');
        if ($servDetTable.length > 0) {
            $('.jsToggleTableDropdown').on('click', function() {
                var $this = $(this),
                    $dropDown = $this.next('.table-dropdown').find('.drop-down-wrap');
                if (!$this.hasClass('active')) {
                    $this.toggleClass('active');
                    $dropDown.slideToggle();
                } else {
                    $dropDown.slideToggle(function () {
                        $this.toggleClass('active');
                    });
                }
            });
        }
    }
};
var App = (function($, app){
    function init () {
        app.events.init();
    }
    return {
        init: init
    };
})(jQuery, app);
$(function () {
    App.init();
});
$(window).resize(function () {
    app.events.tile();
});
$(window).load(function () {
    var $newsWrap = $('.news-wrap');
    if ($newsWrap.length > 0 ) {
        $newsWrap.masonry({
            columnWidth: '.news-item',
            itemSelector: '.news-item'
        });
    }

    //var $servWrap = $('.serv-wrap');
    //if ($servWrap.length > 0 ) {
    //    $servWrap.masonry({
    //        columnWidth: '.serv-item',
    //        itemSelector: '.serv-item'
    //    });
    //}
});