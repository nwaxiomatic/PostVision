define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'backbonesuper',
    'videojs',
    'vide',
    'css',
    'apps/wagtail/navbar',
    'apps/wagtail/list',
    'apps/wagtail/detailM2M',
], function($, hbs, _, Backbone, BackboneSuper, videojs, vide, css, WagtailNavbarApp, WagtailListApp, 
        WagtailDetailApp){
    var AppRouter = Backbone.Router.extend({
        detailPages: ['contact', 'info'],
        routes: {
            '(:appName/)(:slug/)': 'picker',
            '*actions': 'defaultAction',
        },
        picker: function(appName, slug){
            if(app.currentApp){
                app.currentApp.undelegateEvents();
            }
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
            app.currentApp.delegateEvents();
        },
        navbar: function(){
            var appName = 'navbar';
            if(!app.listApps[appName]){
                app.listApps[appName] = new WagtailNavbarApp({});
                setTimeout("$('#menu').addClass('shown-menu');", 1000);
            }
        },
        list: function(appName){
            if(this.detailPages.indexOf(appName) < 0){
                app.listApps[appName] = new WagtailListApp({
                    appName: appName, 
                });
                app.currentApp = app.listApps[appName];
            }
            else{
                this.detail('standardpages', appName);
            }
        },
        detail: function(appName, slug){
            if(!app.detailApps[appName]){
                app.detailApps[appName] = {};
            }
            if(!app.detailApps[appName][slug]){
                app.detailApps[appName][slug] = new WagtailDetailApp({
                    appName: appName,
                    slug: slug,
                });
            }
            else {
                app.detailApps[appName][slug].render();
            }
            app.currentApp = app.detailApps[appName][slug];
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        },

        checkMobile: function(){
            if( !app.isMobile && $( window ).width() <= app.mobileSize){
                app.isMobile = true;
                app.scrollEnabled = true;
                if(!$('#M2Marrow-check').prop('checked')){
                    $("#M2Marrow-check").click();
                }
            }
            else if ( app.isMobile && $( window ).width() > app.mobileSize){
                app.isMobile = false;
                app.scrollEnabled = true;
            }
        },
    });

    var initialize = function(){
        window.app = window.app || {};
        app.currentApp = undefined;
        app.collections = {};
        app.listViews = {};
        app.listApps = {};
        app.detailApps = {};
        app.router = new AppRouter;
        app.router.on();
        app.firstLoad = true;
        app.isMobile = false;
        app.mobileSize = 1000;
        app.scrollEnabled = true;
        Backbone.history.start({
            pushState: true, 
            silent: app.router.loaded
        });
        app.router.checkMobile();
        $( window ).resize( function(){
            app.router.checkMobile();
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