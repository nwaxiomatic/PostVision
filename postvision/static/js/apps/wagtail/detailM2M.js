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
            $(window).scroll(this.resetTop);
            var self = this;
            $('html').on('DOMMouseScroll mousewheel', function(event){
                self.scrollPage(event);
                $('#M2Marrow-check').attr('disabled', 'disabled');
                setTimeout("$('#M2Marrow-check').removeAttr('disabled');", 100);
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
                    $('#appM2M').append('<ul id="' + listName + '"></ul>');
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
            //$('#detail-block').toggleClass('hidden shown slide-up');
            $('#appM2M').toggleClass('hidden shown');
            if( $('#M2Marrow-check').prop('checked') ){
                $('#appM2M').toggleClass('no-height');
                $('html, body').animate({
                    scrollTop: $('#appM2M').offset().top - 30
                }, 'slow');
            }
            else{
                setTimeout("$('#appM2M').toggleClass('no-height');", 600);
                
                $('html, body').animate({
                    scrollTop: $('body').offset().top
                }, 'slow');
            }
            this.lastScrollTop = $(this).scrollTop();
        },

        resetTop: function (event) {
            var st = $(this).scrollTop();
            if(st ==0 && st < this.lastScrollTop && $('#M2Marrow-check').prop('checked')){
                $("#M2Marrow-check").click();
            }
            this.lastScrollTop = st;
        },

        scrollPage: function(event) {
            var delta = (event.originalEvent.wheelDelta || -event.originalEvent.detail);
            var checked = $('#M2Marrow-check').prop('checked');
            if(!checked && delta < -10){
                event.preventDefault();
                $("#M2Marrow-check").click();
            }
        },
    });
    // Our module now returns our view
    return DetailM2MApp;
});