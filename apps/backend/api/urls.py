from django.urls import path
from .views import messages, chat
urlpatterns = [
    path("messages", messages),
    path("chat", chat),
]
