from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'is_done')