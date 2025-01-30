# Generated by Django 5.1.5 on 2025-01-29 19:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Band',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField()),
                ('cover', models.TextField()),
                ('cover_path', models.TextField()),
                ('logo', models.TextField()),
                ('logo_path', models.TextField()),
                ('spotify', models.TextField()),
                ('instagram', models.TextField()),
                ('show', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.TextField()),
                ('customer_phone', models.TextField()),
                ('customer_email', models.EmailField(max_length=254)),
                ('customer_address', models.TextField()),
                ('customer_receipt', models.TextField()),
                ('customer_receipt_path', models.TextField()),
                ('status', models.TextField()),
                ('type', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('role', models.TextField()),
                ('status', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField()),
                ('use_stock', models.TextField()),
                ('show', models.TextField()),
                ('band', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.band')),
            ],
        ),
        migrations.CreateModel(
            name='ItemImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.TextField()),
                ('path', models.TextField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.item')),
            ],
        ),
        migrations.CreateModel(
            name='ItemSize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('size', models.TextField()),
                ('stock', models.IntegerField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.item')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('item_size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.itemsize')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db.order')),
            ],
        ),
    ]
