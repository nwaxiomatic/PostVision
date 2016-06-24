define([
  'models/page',
  'models/image',
], function(WagtailPage){
  var WagtailStandardPageModel = WagtailPage.extend({
  	idAttribute: 'standardpage_slug',
    modelName: 'home.StandardPage',
    fields: ['slug', 'title', 'intro'],
  });
  // Return the model for the module
  return WagtailStandardPageModel;
});