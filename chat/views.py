from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
import http.client

def send_sms(recipients,data):
    conn = http.client.HTTPConnection("api.msg91.com")

    req_body = '/api/sendhttp.php?'
    req_body += 'country=91&'
    req_body += 'sender=ZENITK&'
    req_body += 'route=2&'
    req_body += 'mobiles=' + ','.join(['91'+x.phone for x in recipients])
    req_body += '&authkey=253066ABp6q1uP5c1e2116&'
    req_body += 'message='
    req_body += '{}%0A{}%0A{}%0A{}'.format(data.get('name'), data.get('phone'), data.get('email'), data.get('project'))[:120]

    print(req_body)
    conn.request("GET", req_body)
    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))

def send_email(recipients,data):
    email_body = '''
        name: {}
        phone: {}
        email: {}
        project-details: 
            {} 
    '''.format(data.get('name'), data.get('phone'), data.get('email'), data.get('project'))

    msg = EmailMessage('zenithec-client', email_body, to=[x.email for x in recipients])
    msg.send()


@api_view(['POST'])
def chat_api(req):
    sz = ClientSerializer(data=req.data)

    if not sz.is_valid():
        print('invalid chat req')
        return Response({
            'msg': 'please fill all fields'
        })

    recipients=Staff.objects.all()
    sz.save()
    send_email(recipients,sz.data)
    send_sms(recipients,sz.data)
    return Response(sz.data)


# send_email({
#     'id': 17,
#     'name': 'Naveen Sundar',
#     'phone': '8940073123',
#     'email': 'naveennvrgup@gmail.com',
#     'project': 'asdfasdf',
#     'date': '2018-12-22T04:47:44.860208Z'
# })
