from django.contrib import admin
from .models import Boleta, Producto, Suscription, TipoProducto, Usuario

admin.site.register(Boleta)
admin.site.register(Producto)
admin.site.register(Suscription)
admin.site.register(TipoProducto)
admin.site.register(Usuario)