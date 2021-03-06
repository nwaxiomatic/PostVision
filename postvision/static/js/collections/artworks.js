define([
  'collections/pages'
], function(WagtailPages){
  var ArtistsCollection = WagtailPages.extend({
  	urlRoot: '/api/v2beta/pages/',
    appName: 'artworks',
    modelName: 'artwork',
    pageType: 'ArtworkPage',
    fields: ['slug', 'title', 'date', 'image', 'video', 'description', 'artwork_preview_url'],
    order: '-title',
    parse: function(response) {
        return response.items;
    },
  });
  // You don't usually return a collection instantiated
  return ArtistsCollection;
});