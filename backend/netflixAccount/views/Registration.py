from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..Serializers import userSerializer

@api_view(['POST'])
def userRegister(request):
    serializeUser = userSerializer(data=request.data)
    serializeUser.is_valid(raise_exception=True)
    serializeUser.save()
    return Response(serializeUser.data, status=status.HTTP_201_CREATED)

