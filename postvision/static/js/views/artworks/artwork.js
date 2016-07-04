define([
	'jquery',
    'views/wagtail/page',
    'css!styles/videoCustom.css',
    'videojs',
], function($, WagtailPageView, VideoCSS, videojs){
    var ArtworkView = WagtailPageView.extend({
        tagName: 'li',
        className: 'artwork',
        render: function(){
        	this._super();
        	$.each(this.$el.children(".video-js"), function(i, video){
                videojs(video, {}, function(){});
            });
        }
    });
    // Our module now returns our view
    return ArtworkView;
});