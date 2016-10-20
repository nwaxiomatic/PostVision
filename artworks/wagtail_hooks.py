from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register)
from .models import ArtworkPage


class ArtworkPageAdmin(ModelAdmin):
    model = ArtworkPage
    list_display = ('title', 'video_title', 'artists', 'latest_revision_created_at', 'live')

    def video_title(self, obj):
    	if obj.video:
    		return obj.video.title
    	return ''
    video_title.admin_order_field = 'video__title'

    def artists(self, obj):
    	return ',<br>'.join([artist.artist.title for artist in 
    		obj.artworkartistlink.all()])
    artists.allow_tags = True

# Now you just need to register your customised ModelAdmin class with Wagtail
modeladmin_register(ArtworkPageAdmin)