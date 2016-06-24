define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'views/artists/artist'
], function($, hbs, _, Backbone, ArtistView){
    var WagtailPageListView = Backbone.View.extend({

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

        addOne: function(model){
            var self = this;
            var appName = self.collection.appName;
            var modelName = self.collection.modelName;
            require(['views/'+appName+'/'+modelName], 
                function ( ModelView ) {
                    var view = new ModelView({
                        model: model
                    });
                    self.$el.prepend(view.el);
                    self.views.push(view);
                    view.bind('all', self.rethrow, self);
            });
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },
    });
    // Our module now returns our view
    return WagtailPageListView;
});