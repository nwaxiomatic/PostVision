"""Just an empty models file to let the testrunner recognize this as app."""
from django.db import models
from django.utils.translation import ugettext_lazy as _

from wagtail.wagtailsnippets.models import register_snippet

from wagtail.wagtailcore.models import Page, Orderable

from wagtail.wagtailadmin.edit_handlers import (
    FieldPanel, MultiFieldPanel, InlinePanel, PageChooserPanel
)
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel

class LinkFields(models.Model):
    title = models.CharField(
        max_length=256,
        verbose_name=_('Title'),
    )
    link_external = models.URLField("External link", blank=True)
    link_page = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        related_name='+'
    )
    link_document = models.ForeignKey(
        'wagtaildocs.Document',
        null=True,
        blank=True,
        related_name='+'
    )

    @property
    def link(self):
        if self.link_page:
            return self.link_page.url
        elif self.link_document:
            return self.link_document.url
        else:
            return self.link_external

    panels = [
        FieldPanel('title'),
        FieldPanel('link_external'),
        PageChooserPanel('link_page'),
        DocumentChooserPanel('link_document'),
    ]

    class Meta:
        abstract = True

class PageLink(LinkFields):
    panels = [
        FieldPanel('title'),
        PageChooserPanel('link_page'),
    ]

    class Meta:
        abstract = True

@register_snippet
class RelatedLinkType(models.Model):
    name = models.CharField(
        max_length=256,
        verbose_name=_('Name'),
    )

    symbol = models.CharField(
        max_length=256,
        verbose_name=_('Symbol'),
        blank=True,
    )

    base_url = models.CharField(
        max_length=127,
    )

    def __unicode__(self):
        return self.name

class RelatedLink(LinkFields):
    link_type = models.ForeignKey(
        RelatedLinkType,
        verbose_name=_('Link type'),
    )

    panels = [
        FieldPanel('link_external'),
        SnippetChooserPanel('link_type'),
    ]

    class Meta:
        abstract = True

    def __unicode__(self):
        return self.url