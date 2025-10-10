from .serializers import EventSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Event
from task.permissions import IsUserOrReadOnly


class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(user=self.request.user)


class EventCreateView(generics.CreateAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EventUpdateView(generics.UpdateAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]


class EventDeleteView(generics.DestroyAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

