define([
    'underscore',
    'collections/children',
    'models/page'
], function(_, ChildPageCollection, WagtailPageModel){
    var NavbarCollection = ChildPageCollection.extend({
        urlRoot: '/api/v2beta/pages/',
        fields: ['slug', 'title'],
        parentID: 3,
        appName: 'navbar',
        modelName: 'nav',
        initialize: function(){
            var self = this;
            var homepage = new WagtailPageModel({
                slug:'home',
            });
            homepage['modelName'] = 'home.HomePage';
            homepage.fetch({
                success: function(){
                    self.parentID = homepage.get('id');
                    self.maybeFetch({
                        success: function(){
                            self.add([homepage]);
                            console.log(self.models);
                        }
                    });
                }
            });
        },
        parse: function(response) {
            return response.items;
        },
    });
  // You don't usually return a collection instantiated
  return NavbarCollection;
});