define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
], function($, hbs, _, Backbone){
    var WagtailPageView = Backbone.View.extend({
        tagName: 'li',
        className: 'artist',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            require([], function(){

            });
            this.model.bind('change', this.render, this);
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
        },

        render: function(){
            $(this.el).html(ArtistTemplate(this.model.toJSON()));
            return this;
        }
    });
    // Our module now returns our view
    return WagtailPageView;
});