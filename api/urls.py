from django.urls import path
from api.views import RoomView,CreateRoomView,GetRoom

urlpatterns = [
    path('',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view())
]
