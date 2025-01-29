import sys

try:
  from django.db import models
except Exception:
  print('Exception: Django Not Found, please install it with "pip install django".')
  sys.exit()


class User(models.Model):
    name = models.TextField()
    username = models.TextField()
    password = models.TextField()
    role = models.TextField()
    status = models.TextField()


class Band(models.Model):
    name = models.TextField()
    description = models.TextField()
    cover = models.TextField()
    cover_path = models.TextField()
    logo = models.TextField()
    logo_path = models.TextField()
    spotify = models.TextField()
    instagram = models.TextField()
    show = models.TextField()


class Item(models.Model):
    band = models.ForeignKey(Band, on_delete=models.CASCADE)
    name = models.TextField()
    description = models.TextField()
    use_stock = models.TextField()
    show = models.TextField()


class ItemSize(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.IntegerField()
    size = models.TextField()
    stock = models.IntegerField()


class ItemImage(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    image = models.TextField()
    path = models.TextField()


class Order(models.Model):
    customer_name = models.TextField()
    customer_phone = models.TextField()
    customer_email = models.EmailField()
    customer_address = models.TextField()
    customer_receipt = models.TextField()
    customer_receipt_path = models.TextField()
    status = models.TextField()
    type = models.TextField()


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item_size = models.ForeignKey(ItemSize, on_delete=models.CASCADE)
    quantity = models.IntegerField()
