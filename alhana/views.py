from django.shortcuts import render , redirect
from .models import ContactMessage




def index_view(request):
    return render(request, 'index.html')

def about_view(request):
    return render(request, 'about.html')

def contact_view(request):
    if request.method == 'POST':
        ContactMessage.objects.create(
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            subject=request.POST.get('subject'),
            message=request.POST.get('message')
        )
        return redirect('contact')  # رجع نفس الصفحة أو صفحة شكرًا
    return render(request, 'contact.html')

def products_view(request):
    return render(request, 'products.html')
