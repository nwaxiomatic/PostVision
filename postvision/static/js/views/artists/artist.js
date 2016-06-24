define([
    'views/wagtail/page'
], function(WagtailPageView){
    var ArtistView = WagtailPageView.extend({
        tagName: 'li',
        className: 'artist',
    });
    // Our module now returns our view
    return ArtistView;
});