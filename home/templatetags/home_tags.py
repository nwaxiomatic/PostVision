from datetime import date
from django import template
from django.conf import settings

from wagtail.wagtailcore.models import Page

register = template.Library()

# Retrieves all live pages which are children of the calling page
#for standard index listing
@register.inclusion_tag(
    'home/tags/standard_index_listing.html',
    takes_context=True
)
def standard_index_listing(context, calling_page):
    pages = calling_page.get_children().live()
    return {
        'pages': pages,
        # required by the pageurl tag that we want to use within this template
        'request': context['request'],
    }