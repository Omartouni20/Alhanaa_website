from django.contrib import admin
from .models import ContactMessage, SiteVisit

admin.site.register(ContactMessage)

@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'path', 'enter_time', 'exit_time', 'duration')
    ordering = ('-enter_time',)
