define([
  'models/page'
], function(WagtailPage){
  var ChildPageModel = WagtailPage.extend({
 	urlRoot: function(){
      return '/api/v2beta/pages/?fields=' + this.fields.join(',') + '&child_of=' + this.parentID + '&slug=';
    },

  });
  // Return the model for the module
  return ChildPageModel;
});