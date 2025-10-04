from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Counter
from .serializers import CounterSerializer
from task import permissions

# Create your views here.

class CounterListView(generics.ListAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Counter.objects.filter(user=self.request.user)


class CounterCreateView(generics.CreateAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CounterUpdateView(generics.UpdateAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly]


class CounterDeleteView(generics.DestroyAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly]

