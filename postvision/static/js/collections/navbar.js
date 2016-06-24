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
        ignore: ['Artworks'],
        initialize: function(){
            var self = this;
            var homepage = new WagtailPageModel({
                'page_slug':'home',
            });
            homepage['modelName'] = 'home.HomePage';
            homepage.fetch({
                success: function(){
                    self.parentID = homepage.get('id');
                    self.maybeFetch({
                        success: function(){
                            homepage.attributes.meta.slug = '';
                            self.add([homepage]);
                        }
                    });
                }
            });
        },
        parse: function(response) {
            var self = this;
            response = response.items;
            response = _.filter(response,function(obj) {
                 return self.ignore.indexOf(obj.title) < 0;
            });
            return response;
        },
    });
  // You don't usually return a collection instantiated
  return NavbarCollection;
});