define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'collections/artists',
    'apps/artists/list',
    'apps/artists/detail',
], function($, hbs, _, Backbone, ArtistCollection, ArtistListApp, 
        ArtistDetailApp){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'artists/': 'artistList',
            ':id/': 'artistDetail',
            '*path':  'artistList',

            '*actions': 'defaultAction',
        },

        artistList: function(){
            app.artistListApp = new ArtistListApp({
                el: $("#container"),
                collection: app.artists,
            });
            app.artistListApp.bind(
                'navigate', this.navigate_to, this
            );
        },
        artistDetail: function(id){
            app.artistDetailApp = new ArtistDetailApp({
                el: $("#container"),
                collection: app.artists,
                id: id,
            });
            app.artistDetailApp.bind(
                'home', this.navigate_to, this
            );
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        },

        navigate_to: function(model){
            var path = (model && model.get('id') + '/') || '';
            this.navigate(path, true);
        },

    });

    var initialize = function(){
        window.app = window.app || {};
        app.artists = new ArtistCollection;
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