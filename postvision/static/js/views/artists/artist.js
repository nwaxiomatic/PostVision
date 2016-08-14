define([
    'views/wagtail/page'
], function(WagtailPageView){
    var ArtistView = WagtailPageView.extend({
        tagName: 'li',
        className: 'artist col-lg-3 col-md-4 col-sm-6 col-xs-12',
    });
    // Our module now returns our view
    return ArtistView;
});