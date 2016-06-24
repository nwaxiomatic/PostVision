define([
  'backbone'
], function(Backbone){
  var WagtailImageModel = Backbone.Model.extend({
    urlRoot: '/api/v2beta/images/',
    idAttribute: 'id',
    url: function() {
		var base =
			_.result(this, 'urlRoot') ||
		urlError();
		if (this.isNew()) return base;
		var id = this.get(this.idAttribute);
		return base + encodeURIComponent(id);
    },

  });
  // Return the model for the module
  return WagtailImageModel;
});