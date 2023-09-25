from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def Test(request):
    return Response({"data":"Working"}, status=status.HTTP_201_CREATED)