define([
    'views/wagtail/page'
], function(WagtailPageView){
    var NavbarView = WagtailPageView.extend({
        tagName: 'li',
        className: 'nav',
        events: {
          'click a' : 'clickPage',
        },

        clickPage: function(){
            $('.menu-collapsed').toggleClass('menu-expanded');
            if(!this.$el.hasClass('active')){
                this.resetBG();
            }
            this.highlight();
            //this.uncheckMenu();
        },

        resetBG: function() {
            var vide = $('#appBG').data('vide');
            if(vide){
                vide.destroy();
            }
        },

        highlight: function() {
            this.$el.siblings().removeClass('active');
            this.$el.addClass('active');
        },
    });
    // Our module now returns our view
    return NavbarView;
});