define([
    'jquery',
    'backbone',
    'apps/wagtail/detail',
], function($, Backbone, DetailApp){
    var DetailM2MApp = DetailApp.extend({
        m2mCollections: {},

        events: {
          'click .arrow-down-check' : 'clickPage',
          'scroll' : 'scrollPage',
        },

        lastScrollTop: 0,
        arrowEnabled: true,

        initialize: function(options){
            this._super(options);
            _.bindAll(this, 'scrollPage');
            // bind to window
            var self = this;
            $('html').on('DOMMouseScroll mousewheel', function(event){
                self.scrollPage(event);
                $('#M2Marrow-check').attr('disabled', 'disabled');
                setTimeout("$('#M2Marrow-check').removeAttr('disabled');", 1000);
            });
        },

        render: function(){
            var self = this;
            //console.log(this.model.toJSON());
            require([
                    'hbs!templates/pages/detailM2M',
                    'hbs!templates/'+self.appName+'/detail',
                    'views/wagtail/list',], 
                    function ( fulltemplate, template, ListView ) {
                self.$el.html(fulltemplate({}));
                $('#appDetail').html(template(self.model.toJSON()));
                $('#appM2M').addClass('hidden no-height');
                $('#detail-block').addClass('shown');
                var m2m = self.model.manytomanyfields;
                if(!m2m){
                    m2m = [];
                }
                for(var i = 0; i < m2m.length; i++){
                    var m2mName = m2m[i][0] 
                    var listName = m2m[i][1] 
                    $('#appM2M').append('<div id="' + listName + '"></div>');
                    self.m2mCollections[listName] = new ListView({
                        collection: self.model.attributes[m2mName + '_collection'],
                        el: '#' + listName,
                        M2M: true,
                    });
                    self.m2mCollections[listName].addAll();
                    self.m2mCollections[listName].bind('all', self.rethrow, self);
                }                
            });            
            return this;
        },

        clickPage: function(event){
            $('#detail-block').toggleClass('hidden shown slide-up');
            $('#appM2M').toggleClass('hidden shown no-height');
            if( $('#M2Marrow-check').prop('checked') ){
                $('html, body').animate({
                    scrollTop: $('#M2Marrow').offset().top - 20
                }, 'slow');
            }
            else{
                $('html, body').animate({
                    scrollTop: $('body').offset().top - 20
                }, 'slow');
            }
        },

        scrollPage: function(event) {
            event.preventDefault();
            var delta = (event.originalEvent.wheelDelta || -event.originalEvent.detail);
            var checked = $('#M2Marrow-check').prop('checked');
            if( (!checked && delta < -30) || (checked && delta > 30)){
                console.log($("#M2Marrow-check"));
                $("#M2Marrow-check").click();
            }
            if (delta < -30) {
                console.log(checked);
                console.log('You scrolled up');
            } else if (delta > 30) {
                console.log(checked);
                console.log('You scrolled down');
            }
        },
    });
    // Our module now returns our view
    return DetailM2MApp;
});