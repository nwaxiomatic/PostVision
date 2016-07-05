define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var WagtailApp = Backbone.View.extend({
        el: "#app",

        renderAnimation: function(element){
            var self = this;
            var renderWait = 1000;
            if(app.firstLoad || element.attr('id') == "menu"){
                renderWait = 0;
                if(element.attr('id') == "app"){
                    app.firstLoad = false;
                }
            }
            setTimeout((function(){
                    self.renderApp();
                }), renderWait);
            if(element.attr('id') == "app"){
                setTimeout((function(){
                    $('#appBG').html('');
                }), renderWait);
                $('#appBG-box').removeClass('shown');
                element.removeClass('shown');
                var resetMenu = ($('body').scrollTop() > 100);
                if(resetMenu){
                    $('#menu').removeClass('shown-menu');
                }
                setTimeout((function(){
                    element.addClass('shown');
                    $('#appBG-box').addClass('shown');
                    if(resetMenu){
                        $('#menu').addClass('shown-menu');
                    }
                }), 1000 + renderWait);
            }
        }
    });
    // Our module now returns our view
    return WagtailApp;
});