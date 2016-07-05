define([
  'collections/pages'
], function(WagtailPages){
  var ArtistsCollection = WagtailPages.extend({
  	urlRoot: '/api/v2beta/pages/',
    appName: 'artists',
    modelName: 'artist',
    pageType: 'ArtistProfilePage',
    fields: ['slug', 'first_name', 'last_name', 'title', 'profile_picture'],
    parse: function(response) {
            return response.items;
        },
  });
  // You don't usually return a collection instantiated
  return ArtistsCollection;
});