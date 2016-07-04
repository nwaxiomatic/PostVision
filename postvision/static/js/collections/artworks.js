define([
  'collections/pages'
], function(WagtailPages){
  var ArtistsCollection = WagtailPages.extend({
  	urlRoot: '/api/v2beta/pages/',
    appName: 'artworks',
    modelName: 'artwork',
    pageType: 'ArtworkPage',
    fields: ['slug', 'title', 'date', 'image', 'video', 'description'],
    parse: function(response) {
        return response.items;
    },
  });
  // You don't usually return a collection instantiated
  return ArtistsCollection;
});