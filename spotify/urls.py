from django.urls import path
from spotify.views import AuthURL,spotify_callback,isAuthenticated

urlpatterns = [
  path("get-auth-url",AuthURL.as_view()),
  path("redirect",spotify_callback),
  path("is-authenticated",isAuthenticated.as_view())
]
