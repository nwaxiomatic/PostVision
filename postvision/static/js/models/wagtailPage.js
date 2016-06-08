define([
  'backbone'
], function(Backbone){
  var WagtailPageModel = Backbone.Model.extend({
    url: function() {
		var base =
			_.result(this, 'urlRoot') ||
		urlError();
		if (this.isNew()) return base;
		var id = this.get(this.idAttribute);
		return base + encodeURIComponent(id);
    },

    parse: function(response, options) {
    	if(response.pages)
        	return response.pages[0];
        else
        	return response;
    },

  });
  // Return the model for the module
  return WagtailPageModel;
});