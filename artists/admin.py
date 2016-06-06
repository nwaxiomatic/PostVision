from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register)

"""from .models import ArtistProfile

class ArtistProfileAdmin(ModelAdmin):
    model = ArtistProfile
    menu_icon = 'date'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    #list_display = ('title', 'example_field2', 'example_field3', 'live')
    #list_filter = ('live', 'example_field2', 'example_field3')
    #search_fields = ('title',)

# Now you just need to register your customised ModelAdmin class with Wagtail
modeladmin_register(ArtistProfileAdmin)
"""