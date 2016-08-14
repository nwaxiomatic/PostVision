define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'views/artists/artist'
], function($, hbs, _, Backbone, ArtistView){
    var WagtailPageListView = Backbone.View.extend({
        M2M: false,
        numLoaded: 0,

        initialize: function(options){
            if (options.M2M) {
                this.M2M = options.M2M;
            }
            _.bindAll(this, 'addOne', 'addAll');
            _.bindAll.apply(_, [this].concat(_.functions(this)));
            //this.collection.bind('add', this.addOne);
            //this.collection.bind('reset', this.addAll, this);
            this.views = []; 
        },

        addAll: function(){
            this.views = [];
            //this.addNextIter();
            this.collection.each(this.addOne);
        },

        addNextIter: function(){
            if(this.collection.models[this.numLoaded]){
                console.log(this.numLoaded);
                var self = this;
                this.addOne(this.collection.models[this.numLoaded], function(){
                    $(window).on("load", function() {
                        self.addNextIter();
                    });
                });
            }
        },

        addOne: function(model, success){
            var self = this;
            var appName = self.collection.appName;
            var modelName = self.collection.modelName;
            require(['views/'+appName+'/'+modelName], 
                function ( ModelView ) {
                    var view = new ModelView({
                        model: model,
                        M2M: self.M2M,
                    });
                    self.$el.prepend(view.el);
                    self.numLoaded = self.numLoaded + 1;
                    //console.log(self.numLoaded);
                    self.views.push(view);
                    view.bind('all', self.rethrow, self);
                    success;
            });
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },
    });
    // Our module now returns our view
    return WagtailPageListView;
});