from django.urls import path
from api.views import RoomView,CreateRoomView,GetRoom,JoinRoom,userInRoom,leaveRoom

urlpatterns = [
    path('',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view()),
    path('join-room',JoinRoom.as_view()),
    path('user-in-room',userInRoom.as_view()),
    path('leave-room',leaveRoom.as_view())
]
