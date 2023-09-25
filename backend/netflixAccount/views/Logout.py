from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def Logout(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {'message': "Logged out"}
    return response