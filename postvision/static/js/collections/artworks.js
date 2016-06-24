define([
  'collections/pages'
], function(WagtailPages){
  var ArtistsCollection = WagtailPages.extend({
    appName: 'artworks',
    modelName: 'artwork',
    pageType: 'ArtworkPage',
    fields: ['slug', 'title', 'date', 'image']
  });
  // You don't usually return a collection instantiated
  return ArtistsCollection;
});