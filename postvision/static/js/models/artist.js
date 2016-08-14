define([
  'models/page'
], function(WagtailPage){
  var ArtistModel = WagtailPage.extend({
    modelName: 'artists.ArtistProfilePage',
    fields: ['slug', 'title', 'profile_picture', 'bio', 
    	'profile_picture', 'first_name', 'last_name',
    	'artistartworklink', 'sitesocialmediacontact', 'profile_picture_url'],
    idAttribute: 'artist_slug',
    manytomanyfields: [['artistartworklink', 'artworks', 'artwork'],],
  });
  // Return the model for the module
  return ArtistModel;
});