define([
  'models/wagtailPage'
], function(WagtailPage){
  var ArtistModel = WagtailPage.extend({
    urlRoot: '/api/v1/pages/?type=artists.ArtistProfilePage&fields=title,first_name,last_name,slug&slug=',
    idAttribute: 'artist_slug',
  });
  // Return the model for the module
  return ArtistModel;
});