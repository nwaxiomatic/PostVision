from datetime import date
from django import template
from django.conf import settings

from artists.models import ArtistProfilePage

register = template.Library()

# Person feed for home page
@register.inclusion_tag(
    'artists/tags/artist_listing_homepage.html',
    takes_context=True
)
def artist_listing_homepage(context, count=2):
    artists = ArtistProfilePage.objects.live()
    return {
        'artists': artists[:count].select_related('profile_picture'),
        # required by the pageurl tag that we want to use within this template
        'request': context['request'],
    }