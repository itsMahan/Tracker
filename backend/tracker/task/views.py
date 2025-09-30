from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer


# Create your views here.

class TaskListView(APIView):
    serializer_class = TaskSerializer

    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskCreateView(APIView):
    serializer_class = TaskSerializer

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskUpdateView(APIView):
    serializer_class = TaskSerializer

    def put(self, request, pk):
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = Task.objects.get(id=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)