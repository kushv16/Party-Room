from django.urls import path
from api.views import RoomView

urlpatterns = [
    path('',RoomView.as_view())
]
