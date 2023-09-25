from django.urls import path, include
from .views import Test, Login, userRegister, userAuthentication, getAllMovies, addMovie, getMovieById, Logout

urlpatterns = [
    path('test', Test),
    path('login', Login),
    path('register', userRegister),
    path('auth', userAuthentication),
    path('addmovies', addMovie),
    path('allmovies', getAllMovies),
    path('getmovie/<slug:id>', getMovieById),
    path('logout', Logout),
    path('auth/',include('drf_social_oauth2.urls',namespace='drf')),
]