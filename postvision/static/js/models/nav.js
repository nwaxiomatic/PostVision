define([
  'models/page'
], function(WagtailPage){
  var NavbarPageModel = WagtailPage.extend({
  	isSelected: false
  });
  // Return the model for the module
  return NavbarPageModel;
});