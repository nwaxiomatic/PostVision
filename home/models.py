from datetime import date

from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField, StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, \
    InlinePanel, PageChooserPanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailforms.models import AbstractEmailForm, AbstractFormField
from wagtail.wagtailsearch import index

from wagtail.wagtailcore.blocks import TextBlock, StructBlock, StreamBlock, FieldBlock, CharBlock, RichTextBlock, RawHTMLBlock
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtaildocs.blocks import DocumentChooserBlock

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import TaggedItemBase

from links.models import LinkFields, RelatedLink
from helpers.models import CarouselItem

# Advert Snippet

class AdvertPlacement(models.Model):
    page = ParentalKey('wagtailcore.Page', related_name='advert_placements')
    advert = models.ForeignKey('home.Advert', related_name='+')


class Advert(models.Model):
    page = models.ForeignKey(
        'wagtailcore.Page',
        related_name='adverts',
        null=True,
        blank=True
    )
    url = models.URLField(null=True, blank=True)
    text = models.CharField(max_length=255)

    panels = [
        PageChooserPanel('page'),
        FieldPanel('url'),
        FieldPanel('text'),
    ]

    def __unicode__(self):
        return self.text

register_snippet(Advert)


# Home Page

class HomePageCarouselItem(Orderable, CarouselItem):
    page = ParentalKey('home.HomePage', related_name='carousel_items')


class HomePageRelatedLink(Orderable, RelatedLink):
    page = ParentalKey('home.HomePage', related_name='related_links')


class HomePage(Page):
    body = RichTextField(blank=True)
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    background_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    background_video = models.ForeignKey(
        'wagtaildocs.Document',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    search_fields = Page.search_fields + [
        index.SearchField('body'),
    ]

    subpage_types = [
        'home.StandardIndexPage', 
        'blog.BlogIndexPage',
        'artists.ArtistIndexPage',
        'events.EventIndexPage',
        'artworks.ArtworkIndexPage',
        'home.StandardPage',
        'contact.ContactPage'
    ]

    api_fields = ['title', 'slug', 'body', 'feed_image', 
        'background_image', 'background_video']

    class Meta:
        verbose_name = "Homepage"

HomePage.content_panels = [
    FieldPanel('title', classname="full title"),
    FieldPanel('body', classname="full"),
    ImageChooserPanel('feed_image'),
    ImageChooserPanel('background_image'),
    DocumentChooserPanel('background_video'),
    #InlinePanel('carousel_items', label="Carousel items"),
    #InlinePanel('related_links', label="Related links"),
]

HomePage.promote_panels = Page.promote_panels


# Standard index page

class StandardIndexPageRelatedLink(Orderable, RelatedLink):
    page = ParentalKey('home.StandardIndexPage', related_name='related_links')


class StandardIndexPage(Page):
    intro = RichTextField(blank=True)
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
    ]

StandardIndexPage.content_panels = [
    FieldPanel('title', classname="full title"),
    FieldPanel('intro', classname="full"),
    #InlinePanel('related_links', label="Related links"),
]

StandardIndexPage.promote_panels = Page.promote_panels + [
    ImageChooserPanel('feed_image'),
]


# Standard page

class StandardPageCarouselItem(Orderable, CarouselItem):
    page = ParentalKey('home.StandardPage', related_name='carousel_items')


class StandardPageRelatedLink(Orderable, RelatedLink):
    page = ParentalKey('home.StandardPage', related_name='related_links')


class StandardPage(Page):
    intro = RichTextField(blank=True)
    body = RichTextField(blank=True)
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    api_fields = ['title', 'intro', 'body']

StandardPage.content_panels = [
    FieldPanel('title', classname="full title"),
    FieldPanel('intro', classname="full"),
    #InlinePanel('carousel_items', label="Carousel items"),
    FieldPanel('body', classname="full"),
    InlinePanel('sitesocialmediacontact', label="Social Media Links"),
    #InlinePanel('related_links', label="Related links"),
]

StandardPage.promote_panels = Page.promote_panels + [
    ImageChooserPanel('feed_image'),
]