from django.db import models
from rest_framework import serializers

class Staff(models.Model):
    name=models.CharField(max_length=200)
    email=models.EmailField()
    phone=models.CharField(max_length=10)
    
    def __str__(self):
        return self.name

class Client(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField()
    project = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields='__all__'