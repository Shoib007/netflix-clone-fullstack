from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from ..models import User
import jwt, datetime
from dotenv import load_dotenv
from os import environ

load_dotenv()

secret = environ.get('SECRET_KEY')

@api_view(['POST'])
def Login(request):
    email = request.data['email']
    password = request.data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed('User not found. Please Register First')
    
    if not user.check_password(password):
        raise AuthenticationFailed("Invalid password")
    
    # Create payload object to attach in the token

    payload = {
        'id' : str(user.id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat' : datetime.datetime.utcnow()
    }


    # Create token

    token = jwt.encode(payload, secret, algorithm='HS256')

    #Create response object

    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True, samesite=None)
    response.data = {
        'jwt': token
    }

    return response