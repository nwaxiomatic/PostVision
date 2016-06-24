define([
  'collections/pages'
], function(WagtailPages){
  var ArtistsCollection = WagtailPages.extend({
    appName: 'artists',
    modelName: 'artist',
    pageType: 'ArtistProfilePage',
    fields: ['slug', 'first_name', 'last_name', 'title']
  });
  // You don't usually return a collection instantiated
  return ArtistsCollection;
});