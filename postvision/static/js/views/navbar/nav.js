define([
    'views/wagtail/page'
], function(WagtailPageView){
    var NavbarView = WagtailPageView.extend({
        tagName: 'li',
        className: 'nav',
    });
    // Our module now returns our view
    return NavbarView;
});