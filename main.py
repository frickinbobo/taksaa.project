import sys
sys.dont_write_bytecode = True
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
import django
django.setup()
from db.models import *
from flask import Flask, render_template, request, redirect, session
import json
from datetime import datetime as dt

app = Flask(__name__)
app.secret_key = "BAD_SECRET_KEY"


@app.route('/', methods=['POST', 'GET'])
def index():
  return render_template('index.html')


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')