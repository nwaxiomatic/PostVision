define([
    'underscore',
    'collections/children',
    'models/nav'  
], function(_, ChildPageCollection, NavbarPageModel){
    var NavbarCollection = ChildPageCollection.extend({
        urlRoot: '/api/v2beta/pages/',
        fields: ['slug', 'title'],
        parentID: 3,
        appName: 'navbar',
        modelName: 'nav',
        ignore: ['Artworks'],
        /*url: function(){
            return this.urlRoot + '?child_of_and_parent=' + this.parentID + '&fields=' + this.fields.join(',');
        },*/
        initialize: function(options){
            var self = this;
            var homepage = new NavbarPageModel({
                'page_slug':'home',
            });
            homepage['modelName'] = 'home.HomePage';
            homepage.fetch({
                success: function(){
                    self.parentID = homepage.get('id');
                    self.maybeFetch({
                        success: function(){
                            homepage.attributes.meta.slug = '';
                            self.add([homepage]); //2
                            console.log('home added');
                            options.success();
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