from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from ..models import User
from ..Serializers import userSerializer
import jwt
from dotenv import load_dotenv
from os import environ

load_dotenv()

SECRET = environ.get('SECRET_KEY', None)

@api_view(['GET'])
def userAuthentication(request):
    token = request.COOKIES.get('jwt')
    print(request)
    if not token:
        return Response(status=status.HTTP_400_BAD_REQUEST);
    try:
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    user = User.objects.filter(id = payload['id']).first()

    userData = userSerializer(user)

    return Response(userData.data, status=status.HTTP_404_NOT_FOUND)