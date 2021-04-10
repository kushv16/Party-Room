from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('id','code','host','guest_can_pause','votes_to_skip','created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('guest_can_pause','votes_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):

  #code has unique=True in the model, hence if we send this code to the backend api it will throw an error saying that code is not unique.
  code = serializers.CharField(validators=[])
  class Meta:
    model = Room
    fields = ('guest_can_pause','votes_to_skip','code')