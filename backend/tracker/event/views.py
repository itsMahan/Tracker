from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import EventSerializer
from rest_framework import generics, status
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


class EventResetView(APIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

    def patch(self, request, pk):
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            return Response({'error': 'Event Not Found!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event)
        event.used = 0
        event.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class EventIncreaseView(APIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

    def patch(self, request, pk):
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            return Response({'error': 'Event Not Found!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event)
        if not event.total:
            event.used += 1
            event.save()
        elif event.used < event.total:
            event.used += 1
            event.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventDecreaseView(APIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

    def patch(self, request, pk):
        try:
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            return Response({'error': 'Event Not Found!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event)
        if event.used > 0:
            event.used -= 1
            event.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

