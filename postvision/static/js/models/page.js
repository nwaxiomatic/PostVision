define([
  'backbone'
], function(Backbone){
  var WagtailPageModel = Backbone.Model.extend({
    idAttribute: 'page_slug',
    fields: ['slug', 'title', 'body'],
    modelName: 'home.HomePage',

    urlRoot: function(){
        return '/api/v2beta/pages/?fields=' + this.fields.join(',') + '&type=' + this.modelName + '&slug=';
    },

    url: function() {
        var base =
            _.result(this, 'urlRoot') ||
        urlError();
        if (this.isNew()) return base;
        var id = this.get(this.idAttribute);
        return base + encodeURIComponent(id);
    },

    parse: function(response, options) {
        if(response.items)
            return response.items[0];
        else
            return response;
    },

    fetch: function(options){
        var self = this;
        options.success = (function() {
        var cached_function = options.success;
        return function() {
            var selfFunc = this;
            if(self.manytomanyfields){
                var modelJSON = self.toJSON();
                for(var i = 0; i < self.manytomanyfields.length; i++){
                    var m2m = modelJSON[
                        self.manytomanyfields[i][0]
                    ];
                    var ids = _.map(m2m, function(value){
                        return value[self.manytomanyfields[i][2]].id;
                    });
                    if(ids.length < 1){
                        return cached_function.apply(selfFunc, arguments);
                    }
                    var appName = self.manytomanyfields[i][1];
                    var j = i;
                    require(['collections/'+appName], function ( collection ) {
                        if (!self.collections[appName]){
                            self.collections[appName] = new collection;
                        }
                        m2mCollection = self.collections[appName];
                        m2mCollection.ids = ids;
                        m2mCollection.maybeFetch({
                            success: function(){
                                self.attributes[self.manytomanyfields[j][0]] = _.map(m2mCollection.models, function(value){
                                    return value.toJSON();
                                });
                                cached_function(self);
                            } 
                        });
                        m2mCollection.ids = [];
                    });
                }
            }
                var result = cached_function.apply(this, arguments);
                return result;
            }
        };
        })();
        this._super(options);
    },

  });
  // Return the model for the module
  return WagtailPageModel;
});