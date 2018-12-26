from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from rest_framework import routers
from chat.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/',chat_api),
    path('', TemplateView.as_view(template_name='index.html')),
]
