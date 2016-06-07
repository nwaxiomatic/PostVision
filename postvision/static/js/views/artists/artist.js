define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'hbs!templates/artists/artist'
], function($, hbs, _, Backbone, ArtistTemplate){
    var ArtistView = Backbone.View.extend({
        tagName: 'li',
        className: 'artist',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
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
    return ArtistView;
});