var app = app || {};
app.events = {
    init: function() {
        this.tile();
    },
    tile: function () {
        var $tile = $('.tile');
        $tile.each(function (i, item) {
            $(item).css('height', $(item).width());
        })
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