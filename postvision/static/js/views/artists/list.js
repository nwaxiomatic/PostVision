define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'views/artists/artist'
], function($, hbs, _, Backbone, ArtistView){
    var ArtistListView = Backbone.View.extend({

        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = []; 
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(artist){
            var view = new ArtistView({
                model: artist
            });
            this.$el.prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },
    });
    // Our module now returns our view
    return ArtistListView;
});