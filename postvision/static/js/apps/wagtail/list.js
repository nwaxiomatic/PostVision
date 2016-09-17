define([
    'jquery',
    'underscore',
    'backbone',
    'apps/wagtail/app',
], function($, _, Backbone, WagtailApp){
    var WagtailListApp = WagtailApp.extend({

        initialize: function(options){
            if(!this.appName){
                this.appName = options.appName;
            }
            var appName = this.appName;
            var self = this;
            require([
                    'collections/'+appName,
                    'views/wagtail/list',
                    'hbs!templates/'+appName+'/list'], 
                    function ( Collection, ListView, ListTemplate ) {
                self.listView = ListView;
                self.template = ListTemplate;
                if (!app.collections[appName]){
                    app.collections[appName] = new Collection({success:_.bind(self.render, self)});
                }
                self.collection = app.collections[appName];
                
                if(!options.dont_fetch){
                    self.collection.maybeFetch({
                        success: _.bind(self.render, self)
                    });
                }
            });
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            this.renderAnimation(this.$el);
        },

        renderApp: function(){
            var options = {}
            options[this.appName] = this.collection.models
            var compiledTemplate = this.template(options);
            this.$el.html( compiledTemplate );
            var appName = this.appName;
            var self = this;
            require([
                    'views/wagtail/list'],
                function (ListView) {
                    app.listViews[appName] = new ListView({
                        collection: app.collections[appName],
                        el: '#'+appName,
                    });
                    var list = app.listViews[appName];
                    list.addAll();
                    list.bind('all', self.rethrow, self);
            });
        },
    });
    // Our module now returns our view
    return WagtailListApp;
});