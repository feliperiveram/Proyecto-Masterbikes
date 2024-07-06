from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .models import Producto
import base64
import codecs


class ProductosView(View):
    def get(self, request):
        try:
            # Inicializar consulta base
            productos = Producto.objects.all()

            # Filtrar según los parámetros de consulta
            if 'ID' in request.GET:
                productos = productos.filter(id=request.GET['ID'])
            elif 'Nombre' in request.GET:
                productos = productos.filter(nombre=request.GET['Nombre'])
            elif 'Tipo' in request.GET:
                productos = productos.filter(id_tipo=request.GET['Tipo'])

            # Convertir la imagen a base64
            productos_list = list(productos.values())
            
            print(productos_list)
            for producto_ in productos_list:
                if 'img' in producto_:
                    producto_['img'] = codecs.decode(producto_['img'],encoding="utf-8")

            return JsonResponse(productos_list, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Error interno"}, status=500)

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