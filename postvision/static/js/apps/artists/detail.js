define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'hbs!templates/artists/detail'
], function($, hbs, _, Backbone, ArtistDetailTemplate){
    var ArtistDetailApp = Backbone.View.extend({
        events: {
            'click .home': 'home'
        },

        initialize: function(){
            var parent = this;
            this.collection.getOrFetch(this.id, {
                success: function(model){
                    parent.model = model;
                    parent.render();                   
                }
            });
        },
        
        home: function(e){
            this.trigger('home');
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ArtistDetailTemplate(this.model.toJSON()));
            return this;
        }       
    });
    // Our module now returns our view
    return ArtistDetailApp;
});