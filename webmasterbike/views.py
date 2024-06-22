from django.shortcuts import render

def index(request):
    return render(request,'views/index.html')

def contactanos(request):
    return render(request,'views/contactanos.html')

def productos(request):
    return render(request,'views/productos.html')

def dashboard(request):
    return render(request,'views/dashboard.html')

def login(request):
    return render(request,'views/login.html')

def register(request):
    return render(request,'views/register.html')