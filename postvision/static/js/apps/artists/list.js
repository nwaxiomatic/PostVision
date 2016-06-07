define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'views/artists/list',
    'hbs!templates/artists/list'
], function($, hbs, _, Backbone, ArtistListView, artistListTemplate){
    var ArtistListApp = Backbone.View.extend({
        initialize: function(){
            this.collection.maybeFetch({
                success: _.bind(this.render, this)
            });
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            var compiledTemplate = artistListTemplate({
                artists: this.collection.models
            });
            this.$el.html( compiledTemplate );
            var list = new ArtistListView({
                collection: this.collection,
                el: this.$('#artists'),
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
        },
    });
    // Our module now returns our view
    return ArtistListApp;
});