define([
  'models/page',
  'models/image',
], function(WagtailPage){
  var ArtworkModel = WagtailPage.extend({
    modelName: 'artworks.ArtworkPage',
    fields: ['slug', 'title', 'image', 'description', 'video'],
    idAttribute: 'artwork_slug',
  });
  // Return the model for the module
  return ArtworkModel;
});