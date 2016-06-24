define([
  'collections/pages'
], function(WagtailPages){
  var WagtailStandardPageCollection = WagtailPages.extend({
    modelName: 'standardpage',
    pageType: 'StandardPage',
    fields: ['slug', 'title', 'date', 'image', 'video']
  });
  // You don't usually return a collection instantiated
  return WagtailStandardPageCollection;
});