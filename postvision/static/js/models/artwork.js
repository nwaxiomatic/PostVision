define([
  'models/page',
  'models/image',
], function(WagtailPage){
  var ArtworkModel = WagtailPage.extend({
    modelName: 'artworks.ArtworkPage',
    fields: ['slug', 'title', 'date', 'image', 'video', 'description'],
    idAttribute: 'artwork_slug',
  });
  // Return the model for the module
  return ArtworkModel;
});