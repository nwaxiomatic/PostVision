define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ArtistModel = Backbone.Model.extend({
    urlRoot: '/api/v1/pages/',
    idAttribute: 'artist_id',

  });
  // Return the model for the module
  return ArtistModel;
});