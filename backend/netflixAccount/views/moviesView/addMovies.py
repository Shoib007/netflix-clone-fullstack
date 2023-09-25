from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ...models import Movies
from ...Serializers import MovieSerializer

@api_view(['POST'])
def addMovie(request):
    movieList = request.data
    createdList = []
    for movie in movieList:
        serialized = MovieSerializer(data=movie)

       
        if serialized.is_valid():
            serialized.save()
            createdList.append(serialized.data)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(createdList, status=status.HTTP_201_CREATED)
