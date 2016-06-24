define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
], function($, hbs, _, Backbone){
    var WagtailPageView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            var self = this;
            var appName = this.model.collection.appName;
            var modelName = this.model.collection.modelName;
            require(['hbs!templates/'+appName+'/'+modelName],
                function (PageTemplate) {
                    self.template = PageTemplate
                    self.render();
            });
            this.model.bind('change', this.render, this);
        },

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
        }
    });
    // Our module now returns our view
    return WagtailPageView;
});