define([
  'collections/wagtail',
], function(WagtailCollection){
  var WagtailPageCollection = WagtailCollection.extend({
    urlRoot: '/api/v1/pages/',
    ids: [],
    appName: 'home',
    modelName: 'page',
    pageType: 'HomePage',
    fields: ['slug', 'title'],

    url: function(){
    	var urlBase = this.urlRoot + '?type=' + this.appName + '.' + this.pageType + '&fields=' + this.fields.join(',');
    	if (this.ids.length > 0){
    		urlBase += '&id=' + this.ids.join(',');
    	}
        return urlBase;
    },
  });
  // You don't usually return a collection instantiated
  return WagtailPageCollection;
});