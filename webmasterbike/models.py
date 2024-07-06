from django.db import models

class Boleta(models.Model):
    numero_orden = models.CharField(max_length=255)
    items = models.TextField()
    precios = models.TextField()
    cantidades = models.TextField()
    fecha_actual = models.CharField(max_length=40)
    fecha_despacho = models.CharField(max_length=50)
    total = models.IntegerField()

    def __str__(self):
        return self.numero_orden

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    id_tipo = models.IntegerField()
    precio = models.IntegerField()
    cantidad = models.IntegerField()
    peso = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=45, null=True, blank=True)
    garantia = models.IntegerField()
    modelo = models.CharField(max_length=105)
    img = models.BinaryField()

    def __str__(self):
        return self.nombre
    
class Suscription(models.Model):
    correo = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.correo

class TipoProducto(models.Model):
    tipo = models.CharField(max_length=105)

    def __str__(self):
        return self.tipo

class Usuario(models.Model):
    correo = models.CharField(max_length=20)
    contraseña = models.CharField(max_length=30)
    nombre = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre
