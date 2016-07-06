from __future__ import absolute_import, unicode_literals

from .base import *

DEBUG = False

ALLOWED_HOSTS = ['http://107.170.47.203/']

try:
    from .local import *
except ImportError:
    pass
