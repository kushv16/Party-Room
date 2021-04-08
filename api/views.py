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

class GetRoom(APIView):
  serializer_class = RoomSerializer
  lookup_url_kwarg = 'code'

  def get(self,request,format=None):
    #getting data through GET request
    code = request.GET.get(self.lookup_url_kwarg)
    if code!=None:
      room = Room.objects.filter(code=code)
      if len(room)>0:
        data = RoomSerializer(room[0]).data
        data['is_host'] = self.request.session.session_key == room[0].host
        return Response(data,status=status.HTTP_200_OK)
      return Response({'Room Not Found': 'Invalid Room Code..'},status=status.HTTP_404_NOT_FOUND)
    return Response({'Bad Request': 'Code Parameter Not Found..'},status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
  lookup_url_kwarg = 'code'
  def post(self,request,format=None):
    if not self.request.session.exists(self.request.session.session_key): 
      self.request.session.create()

    #getting code from post request, we can use request.data for post
    code = request.data.get(self.lookup_url_kwarg)
    if code!=None:
      room = Room.objects.filter(code=code)
      if len(room) > 0:
        room_data = room[0]
        # storing the room code to session 
        self.request.session['room_code'] = code
        return Response({'message':'Room Joined!'},status=status.HTTP_200_OK)

      return Response({'Bad Request':'Invalid code'},status=status.HTTP_400_BAD_REQUEST)

    return Response({'Bad Request' : 'Invalid post request, did not find any such room'},status=status.HTTP_400_BAD_REQUEST)

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
        #storing code in session
        self.request.session['room_code'] = room.code
        room.save(update_fields=['guest_can_pause','votes_to_skip'])
        
        return Response(RoomSerializer(room).data,status=status.HTTP_200_OK)
      #else create a new room 
      else:
        room = Room(host = host,guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
        #storing code in session
        self.request.session['room_code'] = room.code
        room.save()
        return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)
        
      return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)




