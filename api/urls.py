from django.urls import path
from api.views import RoomView,CreateRoomView

urlpatterns = [
    path('',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view())
]
