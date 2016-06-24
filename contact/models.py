from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _

from django.db import models

from links.models import RelatedLink
from home.models import StandardPage

from modelcluster.fields import ParentalKey

from wagtail.wagtailsnippets.models import register_snippet

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel
from wagtail.wagtailcore.fields import RichTextField

class ContactPage(StandardPage):
    content_panels = StandardPage.content_panels + [
        InlinePanel('sitesocialmediacontact', label="Social Media Links"),
    ]

    api_fields = ['intro', 'body', 'slug', 'url', 
        'sitesocialmediacontact']

    class Meta:
        proxy = True

class ContactFields(models.Model):
    telephone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address_1 = models.CharField(max_length=255, blank=True)
    address_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    post_code = models.CharField(max_length=10, blank=True)

    panels = [
        FieldPanel('telephone'),
        FieldPanel('email'),
        FieldPanel('address_1'),
        FieldPanel('address_2'),
        FieldPanel('city'),
        FieldPanel('country'),
        FieldPanel('post_code'),
    ]

    class Meta:
        abstract = True

class SocialMediaContact(RelatedLink):
    handle = models.CharField(
        max_length=4000,
        verbose_name=_('Handle'),
    )

    panels = RelatedLink.panels + [
        FieldPanel('handle'),
    ]

    api_fields = ['link_external', 'type']

    @property
    def type(self):
        return self.link_type.name
    

    def save(self, *args, **kwargs):
        self.link_external = self.link_type.base_url + self.handle
        super(SocialMediaContact, self).save(*args, **kwargs)

    class Meta:
        abstract = True

@register_snippet
class SiteSocialMediaContact(SocialMediaContact):
    site = ParentalKey(Page, related_name='sitesocialmediacontact')