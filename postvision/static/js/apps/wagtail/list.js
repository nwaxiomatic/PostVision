define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var WagtailListApp = Backbone.View.extend({
        el: $("#app"),

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
                    if (!app.collections[appName]){
                        app.collections[appName] = new Collection;
                    }
                    self.collection = app.collections[appName];
                    self.listView = ListView;
                    self.template = ListTemplate;
                    self.collection.maybeFetch({
                        success: _.bind(self.render, self)
                    });
                });
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            var appName = this.appName;

            var options = {}
            options[this.appName] = this.collection.models
            var compiledTemplate = this.template(options);
            this.$el.html( compiledTemplate );

            require([
                    'views/wagtail/list'],
                function (ListView) {
                    app.listViews[appName] = new ListView({
                        collection: app.collections[appName],
                        el: self.$('#'+appName),
                    });
                    var list = app.listViews[appName];
                    list.addAll();
                    list.bind('all', this.rethrow, this);
            });
        },
    });
    // Our module now returns our view
    return WagtailListApp;
});