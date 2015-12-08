var app = app || {};
app.events = {
    init: function() {
        this.tile();
        this.sliderHome();
        this.map();
    },
    tile: function () {
        var $tile = $('.tile');
        $tile.each(function (i, item) {
            $(item).css('height', $(item).width());
        })
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