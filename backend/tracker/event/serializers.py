from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    remainig_events = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ('id', 'created_at', 'remainig_events')

    def get_remainig_events(self, obj):
        return obj.remainig_events
