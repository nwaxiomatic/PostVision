define([
  'models/page',
  'models/image',
], function(WagtailPage){
  var ArtworkModel = WagtailPage.extend({
    modelName: 'artworks.ArtworkPage',
    fields: ['slug', 'title', 'date', 'image', 'video', 'description', 'artwork_preview_url'],
    idAttribute: 'artwork_slug',
  });
  // Return the model for the module
  return ArtworkModel;
});