define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
], function($, hbs, _, Backbone){
    var WagtailPageView = Backbone.View.extend({
        tagName: 'li',
        
        M2M: false,

        initialize: function(options){
            if(options.M2M){
                this.M2M = options.M2M;
            }
            var self = this;
            var appName = this.model.collection.appName;
            var modelName = this.model.collection.modelName;
            if(this.M2M){
                modelName += 'M2M';
            }
            require(['hbs!templates/'+appName+'/'+modelName],
                function (PageTemplate) {
                    self.template = PageTemplate
                    self.render();
            });
        },

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
        }
    });
    // Our module now returns our view
    return WagtailPageView;
});