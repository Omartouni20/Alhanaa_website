from django.utils.deprecation import MiddlewareMixin
from django.utils.timezone import now
from .models import SiteVisit

class VisitorTrackingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/static/') or request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return  # تجاهل الملفات الساكنة وطلبات Ajax

        ip = get_client_ip(request)
        path = request.path
        visit = SiteVisit.objects.create(ip_address=ip, path=path)
        request.session['last_visit_id'] = visit.id

    def process_response(self, request, response):
        visit_id = request.session.get('last_visit_id')
        if visit_id:
            try:
                visit = SiteVisit.objects.get(id=visit_id)
                visit.exit_time = now()
                visit.save()
            except SiteVisit.DoesNotExist:
                pass
        return response

def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip
