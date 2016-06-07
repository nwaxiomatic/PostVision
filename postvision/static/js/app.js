define([
    'jquery',
    'hbs',
    'underscore', 
    'backbone',
    'router',
], function($, hbs, _, Backbone, Router){
    var initialize = function(){
        Router.initialize();
    }
    return {
        initialize: initialize
    };
});