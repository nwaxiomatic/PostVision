define([
  'models/page',
], function(WagtailPage){
  var WagtailStandardPageModel = WagtailPage.extend({
  	idAttribute: 'standardpage_slug',
    modelName: 'home.StandardPage',
    fields: ['slug', 'title', 'body', 'feed_image', 'background_video', 'background_image', 'body_classes'],
  });
  // Return the model for the module
  return WagtailStandardPageModel;
});