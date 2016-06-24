from __future__ import unicode_literals

from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from wagtail.wagtailsearch import index
from wagtail.wagtailsnippets.models import register_snippet

from wagtail.wagtailcore.fields import RichTextField

from contact.models import SocialMediaContact
from links.models import PageLink

from wagtail.wagtailcore.models import Page, Orderable
from modelcluster.fields import ParentalKey

from wagtail.wagtailadmin.edit_handlers import (
    FieldPanel, MultiFieldPanel, InlinePanel, PageChooserPanel
)
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel


class ArtworkPage(Page):
    description = RichTextField(blank=True, null=True)
    date = models.DateField("Post date")
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    video = models.ForeignKey(
        'wagtaildocs.Document',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('date'),
        ImageChooserPanel('image'),
        DocumentChooserPanel('video'),
        InlinePanel('artworkartistlink', label="Artist Attributes"),
    ]

    api_fields = ['slug', 'title', 'description', 'date', 'image', 'video']

    subpage_types = []

class ArtworkIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full"),
    ]

    subpage_types = [ArtworkPage]

@register_snippet
class ArtworkAttributionLink(models.Model):
    artist = ParentalKey('artists.ArtistProfilePage', related_name='artistartworklink')
    artwork = ParentalKey(ArtworkPage, related_name='artworkartistlink')

    api_fields = ['artist', 'artwork']
