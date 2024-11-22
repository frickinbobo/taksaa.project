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

@app.route('/admin/band/', methods=['POST', 'GET'])
def band():
  if not session.get('username'):
    return redirect('/login/')

  if request.method == 'POST':
    name = request.form['name']
    description = request.form['description']
    spotify = request.form['spotify']
    instagram = request.form['instagram']
    cover = request.files['cover']
    cover.filename = secure_filename(uuid.uuid4().hex + '.' + cover.filename.split('.')[-1])
    real_path = os.path.join(app.config['UPLOAD_FOLDER']+'band-cover/', cover.filename)
    cover.save(real_path)
    band = Band.objects.create(name=name, description=description, spotify=spotify, instagram=instagram, cover=real_path)

  bands = Band.objects.all()
  return render_template('admin/band.html', bands=bands)

# API
@app.route('/api/bands/', methods=['GET'])
def api_band():
  bands = serializers.serialize('json', Band.objects.all())
  return jsonify(bands)


# Expose Media Folder
@app.get('/media/<path:path>')
def send_media(path):
    return send_from_directory(
        directory=app.config['UPLOAD_FOLDER'], path=path
    )

@app.get('/test/')
def test():
  user = User.objects.create(name='test', username='admin', password=generate_password_hash('admin'), role='test', status='test')
  # band.commit()

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
  # app.run()