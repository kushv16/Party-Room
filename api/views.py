from django.shortcuts import render
from rest_framework import generics,status
from .models import Room
from .serializers import RoomSerializer,CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class RoomView(generics.ListAPIView):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer


class CreateRoomView(APIView):

  serializer_class = CreateRoomSerializer

  def post(self,request,format=None):
    #condition to check if session key for the user exists
    if not self.request.session.exists(self.request.session.session_key): 
      self.request.session.create()

    #getting data from serializer class
    serializer = self.serializer_class(data = request.data)
    if serializer.is_valid():
      guest_can_pause = serializer.data.get('guest_can_pause')
      votes_to_skip = serializer.data.get('votes_to_skip')
      host = self.request.session.session_key
      queryset = Room.objects.filter(host=host)
      #if a room already exists for the current session then update 
      if queryset.exists():
        room = queryset[0]
        room.guest_can_pause = guest_can_pause
        room.votes_to_skip = votes_to_skip
        room.save(update_fields=['guest_can_pause','votes_to_skip'])
        
        return Response(RoomSerializer(room).data,status=status.HTTP_200_OK)
      #else create a new room 
      else:
        room = Room(host = host,guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
        room.save()
        return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)
        
      return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)




