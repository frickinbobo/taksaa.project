import sys

try:
  from django.db import models
  from django.core.files.storage import FileSystemStorage
except Exception:
  print('Exception: Django Not Found, please install it with "pip install django".')
  sys.exit()


class User(models.Model):
    name = models.TextField()
    username = models.TextField()
    password = models.TextField()
    role = models.TextField()
    status = models.TextField()


class Item(models.Model):
  name = models.TextField()
  description = models.TextField()


class ItemStock(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.IntegerField()
    size = models.TextField()
    stock = models.IntegerField()


class ItemImage(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    image = models.FileField(storage=FileSystemStorage(location='../media/item-images/'))


class Order(models.Model):
    customer_name = models.TextField()
    customer_phone = models.TextField()
    customer_email = models.EmailField()
    customer_address = models.TextField()
    customer_receipt = models.FileField(storage=FileSystemStorage(location='../media/customer-receipt/'))
    status = models.TextField()


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item_stock = models.ForeignKey(ItemStock, on_delete=models.CASCADE)
    quantity = models.IntegerField()
