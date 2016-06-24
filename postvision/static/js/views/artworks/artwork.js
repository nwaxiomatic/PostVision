define([
    'views/wagtail/page'
], function(WagtailPageView){
    var ArtworkView = WagtailPageView.extend({
        tagName: 'li',
        className: 'artwork',
    });
    // Our module now returns our view
    return ArtworkView;
});