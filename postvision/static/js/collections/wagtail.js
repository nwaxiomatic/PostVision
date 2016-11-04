define([
  'underscore',
  'backbone',
  'models/page'
], function(_, Backbone, WagtailPageModel){
  var WagtailPageCollection = Backbone.Collection.extend({
    appName: '',
    modelName: '',
    pageType: '',

    parse: function(response) {
        return response.pages;
    },

    maybeFetch: function(options){
        // Helper function to fetch only if this collection has not been fetched before.
        if(this._fetched){
            // If this has already been fetched, call the success, if it exists
            options.success && options.success();
            return;
        }

        // when the original success function completes mark this collection as fetched
        var self = this,
            successWrapper = function(success){
                return function(){
                    self._fetched = true;
                    success && success.apply(this, arguments);
                    //console.log('fetched');
                };
            };
        options.success = successWrapper(options.success);
        this.fetch(options);
    },

    getOrFetch: function(slug, options){
        // Helper function to use this collection as a cache for models on the server
        var model = this.get(slug);

        if(model && model.get('fully_loaded')){
            options.success && options.success(model);
            return;
        }
        var self = this;

        require(['models/'+this.modelName], 
            function ( modelType ) {
                var slugAttr = self.modelName+'_slug'
                var modelInit = {collection: self};
                modelInit[slugAttr] = slug;
                model = new modelType(modelInit);
                model.fetch(options);
                model['fully_loaded'] = true;
        });
    }
  });
  // You don't usually return a collection instantiated
  return WagtailPageCollection;
});