from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ...models import Movies
from ...Serializers import MovieSerializer

@api_view(['GET'])
def getAllMovies(request):
    movies = Movies.objects.all();
    serializedTraining = MovieSerializer(movies, many = True)
    return Response(serializedTraining.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getMovieById(request, id):
    try:
        movieObj = Movies.objects.filter(id=id).first()
        serializedMovie = MovieSerializer(movieObj)
        print(serializedMovie.data)
        return Response(serializedMovie.data, status=status.HTTP_200_OK)
    except Movies.DoesNotExist:
        return Response({"message": "Movie Not Found"}, status=status.HTTP_400_BAD_REQUEST)