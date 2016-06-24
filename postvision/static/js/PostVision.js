// load the following using JQuery's document ready function
$(document).ready(function(){
 
    // Password model
    var ArtistProfile = Backbone.Model.extend({
        urlRoot: 'http://127.0.0.1:8000/api/v1/pages/',
    });
 
    // set up the view for a password
    var ArtistProfileView = Backbone.View.extend({

        tagName: 'li',
        className: 'artist',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ich.artistTemplate(this.model.toJSON()));
            return this;
        }                        
    });
 
    // define the collection of passwords
    var ArtistProfileCollection = Backbone.Collection.extend({
        model: ArtistProfile,
        url: 'http://127.0.0.1:8000/api/v1/pages/?type=artists.ArtistProfilePage&fields=title,first_name,last_name',
        urlRoot: 'http://127.0.0.1:8000/api/v1/pages/',

        parse: function(response) {
            return response.pages;
        },

        maybeFetch: function(options){
            // Helper function to fetch only if this collection has not been fetched before.
            if(this._fetched){
                // If this has already been fetched, call the success, if it exists
                options.success && options.success();
                return;
            }

            // when the original success function completes mark this collection as fetched
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success && success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, options){
            // Helper function to use this collection as a cache for models on the server
            var model = this.get(id);
            console.log(id);

            if(model){
                options.success && options.success(model);
                return;
            }

            model = new ArtistProfile({
                resource_uri: id
            });

            model.fetch(options);
        }
    });
 
    window.ListView = Backbone.View.extend({

        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(artistprofile){
            var view = new ArtistProfileView({
                model: artistprofile
            });
            $(this.el).prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        }

    });

    window.ListApp = Backbone.View.extend({
        el: "#app",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html(ich.listApp({}));
            var list = new ListView({
                collection: this.collection,
                el: this.$('#artists')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
        }        
    });

    window.DetailApp = Backbone.View.extend({
        events: {
            'click .home': 'home'
        },
        
        home: function(e){
            this.trigger('home');
            e.preventDefault();
        },

        render: function(){
            console.log('render');
            console.log(this.model.toJSON());
            $(this.el).html(ich.detailApp(this.model.toJSON()));
            return this;
        }                                        
    });

    window.Router = Backbone.Router.extend({
        routes: {
            '': 'list',
            ':id/': 'detail'
        },

        navigate_to: function(model){
            var path = (model && model.get('id') + '/') || '';
            this.navigate(path, true);
        },

        detail: function(){},

        list: function(){}
    });
 
    window.app = window.app || {};
    app.artists = new ArtistProfileCollection();
    app.list = new ListApp({
        el: $("#app"),
        collection: app.artists
    });
    app.detail = new DetailApp({
            el: $("#app")
        });
    app.router = new Router();
    app.router.bind('route:list', function(){
        app.artists.maybeFetch({
            success: _.bind(app.list.render, app.list)                
        });
    });
    app.router.bind('route:detail', function(id){
        app.artists.getOrFetch(id, {
            success: function(model){
                app.detail.model = model;
                app.detail.render();                    
            }
        });
    });

    app.list.bind('navigate', app.router.navigate_to, app.router);
    app.detail.bind('home', app.router.navigate_to, app.router);
    Backbone.history.start({
        pushState: true, 
        silent: app.loaded
    });
});