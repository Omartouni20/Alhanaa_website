
from .models import SiteVisit

class VisitorTrackingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith('/admin'):
            ip = request.META.get('REMOTE_ADDR')
            agent = request.META.get('HTTP_USER_AGENT', '')[:255]
            SiteVisit.objects.create(ip_address=ip, user_agent=agent)
        return self.get_response(request)
