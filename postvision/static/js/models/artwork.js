define([
  'models/wagtailPage'
], function(WagtailPage){
  var ArtworkModel = WagtailPage.extend({
    urlRoot: '/api/v1/pages/?type=artists.ArtworkPage&slug=',
    idAttribute: 'artwork_slug',

  });
  // Return the model for the module
  return ArtworkModel;
});