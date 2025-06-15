from django.contrib import admin
from .models import ContactMessage

admin.site.register(ContactMessage)
from django.contrib import admin
from .models import SiteVisit

@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'timestamp')
    ordering = ('-timestamp',)
