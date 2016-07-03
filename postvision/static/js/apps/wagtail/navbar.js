define([
    'jquery',
    'apps/wagtail/list',
], function($, WagtailListApp){
    var WagtailNavbarApp = WagtailListApp.extend({
        el: "#menu",
        appName: 'navbar',
        events: {
        	'click .bar' : 'expandMenu',
        },
        expandMenu: function(){
            $('.menu-collapsed').toggleClass("menu-expanded");
        }
    });
    // Our module now returns our view
    return WagtailNavbarApp;
});