define([
    'jquery',
    'backbone',
], function($, Backbone){
    var WagtailDetailApp = Backbone.View.extend({
        events: {
            'click .home': 'home'
        },

        el: $("#app"),

        initialize: function(options){
            var self = this;
            this.appName = options.appName;
            var appName = this.appName;
            require(['collections/'+appName], 
                function ( collection ) {
                    if (!app.collections[appName]){
                        app.collections[appName] = new collection;
                    }
                    self.collection = app.collections[appName];
                    self.collection.getOrFetch(options.slug, {
                        success: function(model){
                            self.model = model;
                            self.render();                   
                    }});
            });
        },
        
        home: function(e){
            this.trigger('home');
        },

        render: function(){
            var self = this;
            require(['hbs!templates/'+self.appName+'/detail'], 
                function ( template ) {
                    $(self.el).html(template(self.model.toJSON()));
            });
            return this;
        }       
    });
    // Our module now returns our view
    return WagtailDetailApp;
});