define([
    'jquery',
    'backbone',
    'apps/wagtail/app',
], function($, Backbone, WagtailApp){
    var WagtailDetailApp = WagtailApp.extend({

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
                var cached_success = options.success;
                options.success = function(model){
                        self.model = model;
                        self.render();  
                        if(cached_success){
                            cached_success();
                        } 
                    };
                self.collection.getOrFetch(options.slug, options);
            });
        },
        render: function(newEl){
            var el = this.el;
            if(newEl){
                el = newEl;
            }
            var self = this;
            require(['hbs!templates/'+self.appName+'/detail'], 
                function ( template ) {
                    console.log($(el));
                    self.renderAnimation($(el));
                    $(el).html(template(self.model.toJSON()));
            });
            return this;
        },
    });
    // Our module now returns our view
    return WagtailDetailApp;
});