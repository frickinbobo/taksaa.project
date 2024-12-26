import sys
sys.dont_write_bytecode = True
import os
import uuid
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
import django
django.setup()
from db.models import *
from django.core import serializers
from flask import Flask, render_template, request, redirect, session, jsonify, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import json
from datetime import datetime as dt

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'media/'
app.secret_key = "f2fe5f5584862090a200f995e9fc79f6"

# Index Route
@app.route('/', methods=['POST', 'GET'])
def index():
  return render_template('index.html')

# Admin Route
@app.route('/login/', methods=['POST', 'GET'])
def login():
  response = {}
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    user = User.objects.filter(username=username).first()
    if user and check_password_hash(user.password, password):
      session['username'] = user.username
    else:
      response['type'] = 'error'
      response['message'] = 'Login failed! Please check your username or password and try again!'
  if session.get('username'):
    return redirect('/admin/band/')
    

  return render_template('admin/login.html', response=response)


@app.route('/logout/', methods=['POST', 'GET'])
def logout():
  session['username'] = None
  return redirect('/login/')

@app.route('/admin/', methods=['POST', 'GET'])
def dashboard():
  return redirect('/admin/band/')

@app.route('/admin/band/', methods=['POST', 'GET'])
def band():
  if not session.get('username'):
    return redirect('/login/')

  if request.method == 'POST':
    if request.form['button-form'] == 'add':
      name = request.form['name']
      description = request.form['description']
      spotify = request.form['spotify']
      instagram = request.form['instagram']
      cover = request.files['cover']
      cover.filename = secure_filename(uuid.uuid4().hex + '.' + cover.filename.split('.')[-1])
      real_path_cover = os.path.join(app.config['UPLOAD_FOLDER']+'band/band-covers/', cover.filename)
      cover.save(real_path_cover)
      logo = request.files['logo']
      logo.filename = secure_filename(uuid.uuid4().hex + '.' + logo.filename.split('.')[-1])
      real_path_logo = os.path.join(app.config['UPLOAD_FOLDER']+'band/band-logos/', logo.filename)
      logo.save(real_path_logo)
      band = Band.objects.create(name=name, description=description, spotify=spotify, instagram=instagram, cover=real_path_cover, logo=real_path_logo)
    elif request.form['button-form'] == 'edit':
      band = Band.objects.filter(pk=request.form['id']).first()
      id = request.form['id']
      name = request.form['name']
      description = request.form['description']
      spotify = request.form['spotify']
      instagram = request.form['instagram']
      cover = request.files['cover']
      if cover.filename:
        os.remove(band.cover)
        cover.filename = secure_filename(uuid.uuid4().hex + '.' + cover.filename.split('.')[-1])
        real_path = os.path.join(app.config['UPLOAD_FOLDER']+'band-cover/', cover.filename)
        cover.save(real_path)
        edited = Band.objects.filter(pk=id).update(name=name, description=description, spotify=spotify, instagram=instagram, cover=real_path)
      else:
        edited = Band.objects.filter(pk=id).update(name=name, description=description, spotify=spotify, instagram=instagram)
    if request.form['button-form'] == 'delete':
      band = Band.objects.filter(pk=request.form['id'])
      os.remove(band.first().cover)
      os.remove(band.first().logo)
      band.delete()

  bands = Band.objects.all()
  return render_template('admin/band.html', bands=bands)


@app.route('/admin/band/<int:id>/', methods=['POST', 'GET'])
def item(id):
  if not session.get('username'):
    return redirect('/login/')

  response = {}
  band = Band.objects.filter(pk=id).first()
  if band:
    response['band'] = band
    
  if request.method == 'POST':
    if request.form['button-form'] == 'add':
      name = request.form['name']
      description = request.form['description']
      if 'use-stock' in request.form.keys():
        use_stock = request.form['use-stock']
      else:
        use_stock = "off"
      new_item = Item.objects.create(band=band, name=name, description=description, use_stock=use_stock)
      sizes = []
      prices = []
      stocks = []
      for size in request.form.keys():
        d = {}
        if 'size-' in size:
          sizes.append(request.form[size])
        elif 'price-' in size:
          prices.append(request.form[size])
        elif 'stock-' in size:
          stocks.append(request.form[size])
        
      for i in range(len(sizes)):
        new_size = ItemSize.objects.create(item=new_item, price=prices[i], size=sizes[i], stock=stocks[i])

      images = request.files.getlist('images')
      dir = app.config['UPLOAD_FOLDER']+'item-images/'+ str(new_item.id) + '/'
      if not os.path.exists(dir):
          os.makedirs(dir)

      for image in images:
        image.filename = secure_filename(uuid.uuid4().hex + '.' + image.filename.split('.')[-1])
        real_path = os.path.join(dir, image.filename)
        image.save(real_path)
        ItemImage.objects.create(item=new_item, image=real_path)
    elif request.form['button-form'] == 'edit':
      item = Item.objects.filter(pk=request.form['id'])
      if len(item) > 0:
        name = request.form['name']
        description = request.form['description']
        if 'use-stock' in request.form.keys():
          use_stock = request.form['use-stock']
        else:
          use_stock = "off"
        item.update(name=name, description=description, use_stock=use_stock)
      
    elif request.form['button-form'] == 'delete':
      item = Item.objects.filter(pk=request.form['id'])
      images = item.first().itemimage_set.all()
      for image in images:
        os.remove(image.image)
      os.rmdir(app.config['UPLOAD_FOLDER']+'item-images/'+str(item.first().id))
      item.delete()
    
    elif request.form['button-form'] == 'add-image':
      item = Item.objects.filter(pk=request.form['id']).first()
      if item:
        images = request.files.getlist('image-add')
        dir = app.config['UPLOAD_FOLDER']+'item-images/'+ str(item.id) + '/'
        if not os.path.exists(dir):
            os.makedirs(dir)

      for image in images:
        image.filename = secure_filename(uuid.uuid4().hex + '.' + image.filename.split('.')[-1])
        real_path = os.path.join(dir, image.filename)
        image.save(real_path)
        ItemImage.objects.create(item=item, image=real_path)

    elif request.form['button-form'] == 'edit-image':
      if request.form['id']:
        item_image = ItemImage.objects.filter(pk=request.form['id']).first()
        if request.files['image-edit']:
          image = request.files['image-edit']
          os.remove(item_image.image)
          image.filename = secure_filename(uuid.uuid4().hex + '.' + image.filename.split('.')[-1])
          real_path = app.config['UPLOAD_FOLDER']+'item-images/'+ str(item_image.item.id) + '/' + image.filename
          image.save(real_path)
          ItemImage.objects.filter(pk=request.form['id']).update(image=real_path)


  if band:
    items = band.item_set.all()
    response['items'] = [{'item': item, 'size': item.itemsize_set.all(), 'image': item.itemimage_set.all()} for item in items]

  return render_template('admin/item.html', response=response)

@app.route('/admin/order/', methods=['POST', 'GET'])
def order():
  if not session.get('username'):
    return redirect('/login/')

  if request.method == 'POST':
    if request.form['button-form'] == 'add':
      name = request.form['name']
      phone = request.form['phone']
      email = request.form['email']
      address = request.form['address']
      receipt = request.files['receipt']
      receipt.filename = secure_filename(uuid.uuid4().hex + '.' + receipt.filename.split('.')[-1])
      
      real_path_receipt = os.path.join(app.config['UPLOAD_FOLDER']+'customer-receipt/', receipt.filename)
      receipt.save(real_path_receipt)

      new_order = Order.objects.create(customer_name=name, customer_phone=phone, customer_email=email, customer_address=address, customer_receipt=real_path_receipt, status=0)


  orders = []
  for order in Order.objects.all():
    single_order = {}
    single_order['order'] = order
    single_order['order_item'] = order.orderitem_set.all()
    orders.append(single_order)
    
  return render_template('admin/order.html', orders=orders)


# API
# Get
@app.route('/api/get/bands/', methods=['GET'])
def api_get_bands():
  bands = serializers.serialize('json', Band.objects.all())
  return jsonify(bands)

@app.route('/api/get/item-data/size/<int:id_item>/', methods=['GET'])
def api_get_itemsize(id_item):
  item = serializers.serialize('json', Item.objects.filter(pk=id_item))
  sizes = serializers.serialize('json', Item.objects.filter(pk=id_item).first().itemsize_set.all())
  data = {'item': item, 'sizes': sizes}
  return jsonify(data)


@app.route('/api/get/item-data/image/<int:id_item>/', methods=['GET'])
def api_get_itemimage(id_item):
  item = serializers.serialize('json', Item.objects.filter(pk=id_item))
  images = serializers.serialize('json', Item.objects.filter(pk=id_item).first().itemimage_set.all())
  data = {'item': item, 'images': images}
  return jsonify(data)

# Delete
@app.route('/api/delete/item-data/size/<int:id_item>/', methods=['DELETE'])
def delete_item(id_item):
  if session.get('username'):
    if request.method == 'DELETE':
      item = ItemSize.objects.filter(pk=id_item).first().delete()
  return jsonify({})

@app.route('/api/delete/item-data/image/<int:id_image>/', methods=['DELETE'])
def delete_image(id_image):
  if session.get('username'):
    if request.method == 'DELETE':
      item = ItemImage.objects.filter(pk=id_image).first()
      os.remove(item.image)
      item.delete()
  return jsonify({})

# Put
@app.route('/api/put/item-data/size/<int:id_item>/', methods=['PUT'])
def put_item(id_item):
  if session.get('username'):
    if request.method == 'PUT':
      size = request.get_json()['size']
      price = request.get_json()['price']
      stock = request.get_json()['stock']
      item = ItemSize.objects.filter(pk=id_item).update(size=size, price=price, stock=stock)
  
  return jsonify({})

# Post
@app.route('/api/post/item-data/size/<int:id_item>/', methods=['POST'])
def post_item(id_item):
  if session.get('username'):
    if request.method == 'POST':
      size = request.get_json()['size']
      price = request.get_json()['price']
      stock = request.get_json()['stock']
      item = ItemSize.objects.create(item=Item.objects.filter(pk=id_item).first(), size=size, price=price, stock=stock)
  
  return jsonify({})

# Expose Media Folder
@app.get('/media/<path:path>')
def send_media(path):
    return send_from_directory(
        directory=app.config['UPLOAD_FOLDER'], path=path
    )

@app.get('/test/')
def test():
  # user = User.objects.create(name='test', username='admin', password=generate_password_hash('admin'), role='test', status='test')
  
  return render_template('admin/test.html')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  # app.run()