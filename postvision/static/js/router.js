define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'collections/artists',
    'apps/wagtail/list',
    'apps/wagtail/detail',
], function($, hbs, _, Backbone, ArtistCollection, WagtailListApp, 
        WagtailDetailApp){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '(:appName/)(:slug/)': 'picker',
            '*actions': 'defaultAction',
        },

        artistList: function(){
            this.list('artists');
        },
        picker: function(appName, slug){
            if(!appName){
                this.artistList();
            }
            else if(!slug){
                this.list(appName);
            }
            else{
                this.detail(appName, slug);
            }
        },
        list: function(appName){
            app.listApps[appName] = new WagtailListApp({
                appName: appName, 
            });
            app.listApps[appName].bind(
                'navigate', this.navigate_to, this
            );
        },
        detail: function(appName, slug){
            app.detailApps[appName] = new WagtailDetailApp({
                appName: appName,
                slug: slug,
            });
            app.detailApps[appName].bind(
                'home', this.navigate_to, this
            );
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        },

        navigate_to: function(model){
            var path = (model && model.get('slug') + '/') || '';
            this.navigate(path, true);
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