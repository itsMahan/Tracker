from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializers import TaskSerializer
from . import permissions

# Create your views here.

class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly]

class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly]


class TaskMarkAsDoneView(APIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, permissions.IsUserOrReadOnly] # Add permissions

    def patch(self, request, pk):
        try:
            task = Task.objects.get(id=pk, user=request.user) # Ensure user owns the task
        except Task.DoesNotExist:
            return Response({'error': 'Task Not Found'}, status=status.HTTP_404_NOT_FOUND)

        # Get is_done from request data, default to current value if not provided
        is_done_from_request = request.data.get('is_done', task.is_done)
        task.is_done = is_done_from_request
        task.save()
        serializer = TaskSerializer(task) # Serialize after saving to get updated data
        return Response(serializer.data, status=status.HTTP_200_OK)

