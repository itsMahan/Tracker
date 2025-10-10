from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.timezone import now
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


class CounterResetView(APIView):
    serializer_class = CounterSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly]

    def patch(self, request, pk):
        try:
            counter = Counter.objects.get(id=pk)
        except Counter.DoesNotExist:
            return Response({'error': 'Counter Not Found!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CounterSerializer(counter)
        counter.start_date = now().date()
        counter.save()
        return Response(serializer.data, status=status.HTTP_200_OK)



