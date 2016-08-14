from datetime import datetime, time, timedelta
import hashlib

from django.core.urlresolvers import reverse

from wagtail.wagtailcore.models import Site
from wagtail.wagtailimages.utils import generate_signature


def generate_image_url(image, filter_spec):
    signature = generate_signature(image.id, filter_spec)
    url = reverse('wagtailimages_serve', args=(signature, image.id, filter_spec))

    try:
        site_root_url = Site.objects.get(is_default_site=True).root_url
    except Site.DoesNotExist:
        site_root_url = Site.objects.first().root_url

    image_filename = image.file.name[len('original_images/'):]

    return url + image_filename