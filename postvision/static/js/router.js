define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'backbonesuper',
    'videojs',
    'apps/wagtail/navbar',
    'apps/wagtail/list',
    'apps/wagtail/detail',
], function($, hbs, _, Backbone, BackboneSuper, VideoJS, WagtailNavbarApp, WagtailListApp, 
        WagtailDetailApp){
    var AppRouter = Backbone.Router.extend({
        detailPages: ['contact', 'about'],
        routes: {
            '(:appName/)(:slug/)': 'picker',
            '*actions': 'defaultAction',
        },
        picker: function(appName, slug){
            this.navbar();
            if(!appName){
                this.detail('pages', 'home');
            }
            else if(!slug){
                this.list(appName);
            }
            else{
                this.detail(appName, slug);
            }
        },
        navbar: function(){
            var appName = 'navbar';
            app.listApps[appName] = new WagtailNavbarApp();
        },
        list: function(appName){
            if(this.detailPages.indexOf(appName) < 0){
                app.listApps[appName] = new WagtailListApp({
                    appName: appName, 
                });
            }
            else{
                this.detail('standardpages', appName);
            }
        },
        detail: function(appName, slug){
            app.detailApps[appName] = new WagtailDetailApp({
                appName: appName,
                slug: slug,
            });
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        },
    });

    var initialize = function(){
        window.app = window.app || {};
        app.collections = {};
        app.listViews = {};
        app.listApps = {};
        app.detailApps = {};
        app.router = new AppRouter;
        app.router.on();
        Backbone.history.start({
            pushState: true, 
            silent: app.router.loaded
        });
        $(document).on("click", "a[href^='/']", function(event){
            href = $(event.currentTarget).attr('href');
            passThrough = (href.indexOf('sign_out') >= 0);
            if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey){
                event.preventDefault();
                url = href.replace(/^\//,'').replace('\#\!\/','');
                app.router.navigate(url, { trigger: true })
                return false;
            }
        });
    };
    return {
        initialize: initialize
    };
});