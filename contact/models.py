from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _

from django.db import models

from links.models import RelatedLink

from wagtail.wagtailadmin.edit_handlers import FieldPanel

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

    class Meta:
        abstract = True