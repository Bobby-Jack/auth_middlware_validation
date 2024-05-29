from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

class Blocage:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_auth = JWTAuthentication()  # Initialize JWTAuthentication instance

    def __call__(self, request):

        if request.path == '/api/connect':
            print('middleware catch path')
            try:
                user, token = self.jwt_auth.authenticate(request)
                if user and user.is_authenticated:
                    print('allready connected')
                    return JsonResponse({"status": "allreadyConnected", "message": "Token is allready in the request"})
            except InvalidToken:
                print('invalid token => go views')
                return self.get_response(request)  # Pass through if authenticated
            except TypeError:
                return self.get_response(request)  # Pass through if authenticated
    
        if request.path == "/api/get_all_users":
            try:
                auth = JWTAuthentication()
                user , _ = auth.authenticate(request)

                if user.role_id != 2:
                    return JsonResponse({
                    "status": "middlware_not_permission",
                    "message": "middlware_ request reserved to admin"
                })
            except:
                return JsonResponse({
                    "status": "middlware_not_connected",
                    "message": "middlware_ request do not contain JWtoken"
                })
            
        return self.get_response(request)  # Pass through for other paths
