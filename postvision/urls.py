from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url, patterns
from django.contrib import admin

from search import views as search_views
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.contrib.wagtailapi import urls as wagtailapi_urls
from wagtail.api.v2 import urls as wagtailapi_urls2
from wagtail.wagtailimages.views.serve import ServeView

from django.views.generic.base import TemplateView

#import debug_toolbar

urlpatterns = [
    #url(r'^__debug__/', include(debug_toolbar.urls)),

    url(r'^api/', include(wagtailapi_urls2)),
    url(r'^api/', include(wagtailapi_urls)),

    url(r'^django-admin/', include(admin.site.urls)),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url(r'', include(wagtail_urls)),

    url(r'^(?P<path>.*)/$', TemplateView.as_view(template_name='home/base.html')),
    url(r'^$', TemplateView.as_view(template_name='home/base.html')),
    url(r'^images/([^/]*)/(\d*)/([^/]*)/[^/]*$', ServeView.as_view(), name='wagtailimages_serve'),
]

from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


# Serve static and media files from development server
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
