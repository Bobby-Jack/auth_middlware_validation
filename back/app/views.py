from django.shortcuts import render
import json
from django.contrib.auth.hashers import make_password # pour hacher un mdp (obligatoire avant de l e stocker dans la db)
from .models import *
from django.http import JsonResponse # je pourrais envoyer des reponse en Json
from django.core.mail import send_mail # Je vais pouvoir envoyer des mails
from django.template.loader import render_to_string
from back.settings import DEFAULT_BACK_EMAIL

from .serializer import UserSerializer


from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
# Create your views here.

from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(["POST"])
def new_register(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'status' : 'allready_exist',
            'message' : 'this username is allready used.'
        })
    
    new_user = User(role_id=1,username=username, password=make_password(password), email=email)
    new_user.save()
    mail_context = render_to_string("mailTemplate.html", {"username": username})
    
    send_mail("new account", "", DEFAULT_BACK_EMAIL, [email], html_message=mail_context)
    return JsonResponse({
        "status" : 'success',
        "message" : 'account successfully create',
    })

@api_view(["POST"])
def try_connect(request):
   return JsonResponse('hello')

@api_view(["POST"])
def new_connexion(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    print('try autenticate')
    user = authenticate(request, username=username, password=password)

    print('user is numl ?')
    if user is None:
        print('yes')
        return JsonResponse({
            "status": "fail_connexion",
            "message": "informations is not valid"
        })
    else:
        print('no')
        login(request, user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return JsonResponse({
            "status": "success",
            "message": "connecion valid",
            "access_token" : access_token,
            "refresh" : str(refresh)
        })

@api_view(["POST"])
def deconexion(request):
    logout(request)
    return JsonResponse({
            "status": "success",
            "message": "logout success",
        }) 



def get_user(request):
    try:
        auth = JWTAuthentication()
        user , _ = auth.authenticate(request)
    except:
         return JsonResponse({
            "status": "not_connected",
            "message": "request do not contain JWtoken"
        })
    
    user_data = {
        'username' : user.username,
        'id' : user.id,
        'email' : user.email,
        'role_id' : user.role_id
    }

    return JsonResponse({
            "status": "success",
            "message": "get_user() successfully result",
            "user_data" : user_data
        }) 


def get_all_users(request):
    all_users = UserSerializer(User.objects.all(), many=True)
    return JsonResponse({
            "status": "success",
            "message": "data successfully load",
            "usersData" : all_users.data
        })


@api_view(["POST"])
def validation(request):
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    phone = data.get('phone')
    city = data.get('city')
    postal = data.get('postal')
    url_mig = data.get('url_img')

    # test password

    if len(password) < 8:
        return JsonResponse({
            "status" : "invalid validation",
            "message" : "too short psw"
        })
    
    maj = False
    min = False
    special = False
    number = False
    
    for letter in password:
        if letter.isupper():
            maj = True
            continue
        if letter.islower():
            min = True
            continue
        if letter.isnumeric():
            number = True
            continue
        if letter in ["-","_","!",".","?","/",'%',"é","à","è","#"]:
            special = True
            continue
            
    if special == False or number == False or maj == False or min == False:
        return JsonResponse({
            "status" : "invalid validation",
            "message" : "psw special caracters missing"
        })
    


     
    
    print('ok')
    return JsonResponse({
        "status": "success",
        "message" : "okok"
    })






@api_view(["PUT"])
def change_role(request, id):
    data = json.loads(request.body)
    role_id = data.get('role_id')

    print('id = ', id)

    try : 
        user = User.objects.get(id=id)
        user.role_id= role_id
        user.save()
        return JsonResponse({
            'status' : 'success',
            "message" :" rôle modifier",
        })
    except User.DoesNotExist:
        return JsonResponse(
        {'status': "notExist", "message": "this id not match with a user" }
        )


    
   