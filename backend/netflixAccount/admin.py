from django.contrib import admin
from .models import User, Movies
# Register your models here.
admin.site.register([User, Movies])