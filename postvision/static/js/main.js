require.config({
  /*paths: {
    jquery: '{% static "jquery/dist/jquery.min.js" %}',
    icanhaz: '{% static "icanhaz/ICanHaz.min.js" %}',
    json2: '{% static "json2/json2.js" %}',
    underscore: '{% static "underscore/underscore-min.js" %}',
    backbone: '{% static "backbone/backbone-min.js" %}',
  }*/
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore-min',
        backbone: 'bower_components/backbone/backbone-min',
        hbs: 'bower_components/require-handlebars-plugin/hbs',
        imagesloaded: 'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
        templates: '../templates',
        backbonesuper: 'bower_components/backbone-super/backbone-super/backbone-super-min',
        videojs: 'bower_components/video.js/dist/video',
        vide: 'bower_components/vide/dist/jquery.vide.require',
    },

    shim: {
      "videojs":{
         deps: ['jquery'],
         exports:"videojs"

       }
    },

    map: {
  '*': {
    'css': 'bower_components/require-css/css' // or whatever the path to require-css is
  }
},

    css :{
      buildCSS: false,
      separateCSS: true,
      dir: 'styles',
  siteRoot: '../../',
    }
});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});