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

from contact.models import ContactFields

class ArtistProfilePage(Page):
    first_name = models.CharField(max_length=127, blank=True, null=True)
    last_name = models.CharField(max_length=127, blank=True, null=True)
    intro = RichTextField(blank=True, null=True)
    bio = RichTextField(blank=True, null=True)
    profile_picture = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    search_fields = Page.search_fields + [
        index.SearchField('first_name'),
        index.SearchField('last_name'),
        index.SearchField('intro'),
        index.SearchField('biography'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('first_name'),
        FieldPanel('last_name'),
        FieldPanel('intro', classname="full"),
        FieldPanel('bio', classname="full"),
        ImageChooserPanel('profile_picture'),
        ImageChooserPanel('feed_image'),
        #MultiFieldPanel(ContactFields.panels, "Contact"),
        InlinePanel('socialmediacontact', label="Social Media Links"),
        InlinePanel('socialmediacontact', label="Related Links"),
    ]

    promote_panels = Page.promote_panels + [
        ImageChooserPanel('feed_image'),
    ]

    api_fields = ['first_name', 'last_name', 'intro', 'bio',
        'profile_picture', 'feed_image', 'slug']

    def __unicode__(self):
        return self.first_name + ' ' + self.last_name

class ArtistIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full"),
        InlinePanel('artistprofilelink', label="Related links"),
    ]

    subpage_types = [ArtistProfilePage]

    @property
    def artists(self):
        artists = ArtistProfilePage.objects.live().descendant_of(self)

        artists = artists.order_by('last_name')

        return artists

    def get_context(self, request):
        # Get blogs
        artists = self.artists

        # Filter by tag
        tag = request.GET.get('tag')
        if tag:
            artists = artists.filter(tags__name=tag)

        # Pagination
        page = request.GET.get('page')
        paginator = Paginator(artists, 10)  # Show 10 blogs per page
        try:
            artists = paginator.page(page)
        except PageNotAnInteger:
            artists = paginator.page(1)
        except EmptyPage:
            artists = paginator.page(paginator.num_pages)

        # Update template context
        context = super(ArtistIndexPage, self).get_context(request)
        context['artists'] = artists
        return context

class ArtistSocialMediaContact(SocialMediaContact):
    artist = ParentalKey(ArtistProfilePage, related_name='socialmediacontact')

@register_snippet
class ArtistProfileLink(PageLink):
    page = ParentalKey(ArtistIndexPage, related_name='artistprofilelink')

class ArtworkPage(Page):
    description = RichTextField(blank=True, null=True)
    date = models.DateField("Post date")
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

@register_snippet
class ArtworkAttributionLink(PageLink):
    artist = ParentalKey(ArtistProfilePage, related_name='artistartworklink')
    
