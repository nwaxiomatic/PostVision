define([
  'collections/pages'
], function(WagtailPages){
  var ChildPageCollection = WagtailPages.extend({
    fields: ['slug', 'title', 'intro'],
    url: function(){
        return this.urlRoot + '?child_of=' + this.parentID + '&fields=' + this.fields.join(',');
    },
  });
  // You don't usually return a collection instantiated
  return ChildPageCollection;
});