
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join_room',index),
    path('create_room',index)
]
