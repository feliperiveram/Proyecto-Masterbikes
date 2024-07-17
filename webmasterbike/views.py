from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views import View
from .models import Producto
import json
import codecs
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class ProductosView(View):
    def get(self, request):
        # Obtén el parámetro id_tipo de la solicitud GET
        id_tipo = request.GET.get('id_tipo')
        
        # Filtra los productos por id_tipo si se proporciona, de lo contrario obtiene todos los productos
        if id_tipo:
            productos = Producto.objects.filter(id_tipo=id_tipo)
        else:
            productos = Producto.objects.all()
        
        print(productos)
        
        productos_list = list(productos.values())
        print(productos_list)
        
        for producto_ in productos_list:
            if 'img' in producto_:
                producto_['img'] = codecs.decode(producto_['img'], encoding="utf-8")
        
        return JsonResponse(productos_list, safe=False)

    def post(self, request):
        print(request.body)
        data = json.loads(request.body)
        print(data)
        producto = Producto.objects.create(
            nombre=data.get('nombre'),
            id_tipo=data.get('id_tipo'),
            precio=data.get('precio'),
            cantidad=data.get('cantidad'),
            peso=data.get('peso'),
            color=data.get('color'),
            garantia=data.get('garantia'),
            modelo=data.get('modelo')
        )
        return JsonResponse({'id': producto.id}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class ProductoDetailView(View):
    def get(self, request, id):
        producto = get_object_or_404(Producto, id=id)
        producto_data = {
            'id': producto.id,
            'nombre': producto.nombre,
            'id_tipo': producto.id_tipo,
            'precio': producto.precio,
            'cantidad': producto.cantidad,
            'peso': producto.peso,
            'color': producto.color,
            'garantia': producto.garantia,
            'modelo': producto.modelo,
            'img': codecs.decode(producto.img, encoding="utf-8")
        }
        return JsonResponse(producto_data)

    def put(self, request, id):
        producto = get_object_or_404(Producto, id=id)
        data = json.loads(request.body)
        producto.nombre = data.get('nombre', producto.nombre)
        producto.id_tipo = data.get('id_tipo', producto.id_tipo)
        producto.precio = data.get('precio', producto.precio)
        producto.cantidad = data.get('cantidad', producto.cantidad)
        producto.peso = data.get('peso', producto.peso)
        producto.color = data.get('color', producto.color)
        producto.garantia = data.get('garantia', producto.garantia)
        producto.modelo = data.get('modelo', producto.modelo)
        producto.save()
        return JsonResponse({'id': producto.id})

    def delete(self, request, id):
        producto = get_object_or_404(Producto, id=id)
        producto.delete()
        return HttpResponse(status=204)

def index(request):
    return render(request,'views/index.html')

def contactanos(request):
    return render(request,'views/contactanos.html')

def productos(request):
    return render(request,'views/productos.html')

def productose(request):
    return render(request,'views/productosedit.html')

def dashboard(request):
    return render(request,'views/dashboard.html')

def login(request):
    return render(request,'views/login.html')

def register(request):
    return render(request,'views/registrar.html')