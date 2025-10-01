from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize

from .models import Counter
from .serializers import CounterSerializer


# Create your views here.

class CounterListView(APIView):
    serializer_class = CounterSerializer

    def get(self, request):
        counters = Counter.objects.all()
        serializer = CounterSerializer(counters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CounterCreateView(APIView):
    serializer_class = CounterSerializer

    def post(self, request):
        serializer = CounterSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                serializer.validated_data['user'] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CounterUpdateView(APIView):
    serializer_class = CounterSerializer

    def put(self, request, pk):
        counter = Counter.objects.get(id=pk)
        serializer = CounterSerializer(instance=counter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        counter = Counter.objects.get(id=pk)
        counter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
