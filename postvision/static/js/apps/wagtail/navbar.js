define([
    'jquery',
    'apps/wagtail/list',
], function($, WagtailListApp){
    var WagtailNavbarApp = WagtailListApp.extend({
        el: $("#menu"),
        appName: 'navbar',
    });
    // Our module now returns our view
    return WagtailNavbarApp;
});