define([
    'jquery',
    'backbone',
    'apps/wagtail/detail',
    'mousewheel',
], function($, Backbone, DetailApp){
    var DetailM2MApp = DetailApp.extend({
        m2mCollections: {},

        events: {
          'click .arrow-down-check' : 'clickPage',
          'DOMMouseScroll' : 'mousewheel',
          'mousewheel' : 'mousewheel',
        },

        lastScrollTop: 0,
        arrowEnabled: true,
        scrollEnabled: true,
        isMoving: false,

        initialize: function(options){
            this._super(options);
        },

        render: function(){
            this.renderAnimation(this.$el);
            return this;
        },

        renderApp: function(){
            var self = this;
            //console.log(this.model.toJSON());
            require([
                    'hbs!templates/pages/detailM2M',
                    'hbs!templates/'+self.appName+'/detail',
                    'views/wagtail/list',], 
                    function ( fulltemplate, template, ListView ) {
                
                self.$el.html(fulltemplate({}));
                $('#appDetail').html(template(self.model.toJSON()));
                //$('#appM2M').addClass('hidden-desktop no-height-desktop col-xs-12');
                $('#detail-block').addClass('shown');
                var m2m = self.model.manytomanyfields;
                if(!m2m){
                    m2m = [];
                }
                for(var i = 0; i < m2m.length; i++){
                    var m2mName = m2m[i][0] 
                    var listName = m2m[i][1] 
                    $('#appM2M').append('<ul id="' + listName + '"></ul>');
                    self.m2mCollections[listName] = new ListView({
                        collection: self.model.attributes[m2mName + '_collection'],
                        el: '#' + listName,
                        M2M: true,
                    });
                    self.m2mCollections[listName].addAll();
                    //self.m2mCollections[listName].bind('all', self.rethrow, self);
                }             
            });            
        },

        mousewheel: function(event, delta, deltaX, deltaY){
            //console.log(app.scrollEnabled);
            if(!app.isMobile){
                var checked = $('#M2Marrow-check').prop('checked');
                if(!checked && $('#M2Marrow-check').length > 0) {
                    event.preventDefault();
                };
                this.resetTop(event);
                this.setToTop(event);
                if(!app.scrollEnabled) {
                    return;
                };
                this.scrollPage(event);
                this.navigateTo(event, delta, deltaX, deltaY);
                //$('#M2Marrow-check').attr('disabled', 'disabled');
                //setTimeout("$('#M2Marrow-check').removeAttr('disabled');", 100);
            }
        },

        navigateTo: function(event, delta, deltaX, deltaY){
            if(Math.abs(delta) > 0){
                app.scrollEnabled = false;
                var self = this;
                setTimeout(function() {
                    app.scrollEnabled=true;
                },1000);
            }
        },

        clickPage: function(event){
            /*
            console.log('clicked');
            $('#detail-block').toggleClass('hidden shown slide-up');
            $('#appM2M').toggleClass('hidden-desktop shown');
            if( $('#M2Marrow-check').prop('checked') ){
                //$('#appM2M').toggleClass('no-height-desktop');
                if(!app.isMobile){
                    $('html, body').animate({
                        scrollTop: $('#appM2M').offset().top
                    }, scrolltime);
                }
            }*/
            if(!$('#M2Marrow-check').prop('checked') ){
                var scrolltime = 1000;
                app.scrollEnabled = false;
                setTimeout(this.enableScroll, scrolltime);
                //setTimeout("$('#appM2M').toggleClass('no-height-desktop');", scrolltime);
                if(!app.isMobile){
                    $('html, body').animate({
                        scrollTop: $('body').offset().top
                    }, scrolltime);
                }
            }
        },

        scrollEvent: function(event){
            if(!app.scrollEnabled){
                event.preventDefault();
            }
            else {
                this.resetTop(event);
                this.scrollPage(event);
            }
        },

        resetTop: function (event) {
            var st = $('body').scrollTop();
            if(st < 1 && st < this.lastScrollTop && $('#M2Marrow-check').prop('checked')){
                $("#M2Marrow-check").click();
            }
            this.lastScrollTop = st;
        },

        setToTop: function (event) {
            var st = $('body').scrollTop();
            if(st > 1 && st > this.lastScrollTop && !$('#M2Marrow-check').prop('checked')){
                $("#M2Marrow-check").click();
            }
            this.lastScrollTop = st;
        },

        scrollPage: function(event) {
            var delta = (event.originalEvent.wheelDelta || -event.originalEvent.detail);
            var checked = $('#M2Marrow-check').prop('checked');
            if(!checked && delta < 0){
                $("#M2Marrow-check").click();
            }
        },

        enableScroll: function(){
            app.scrollEnabled = true;
        },
    });
    // Our module now returns our view
    return DetailM2MApp;
});