from rest_framework import serializers
from .models import Counter


class CounterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    days_passed = serializers.SerializerMethodField()
    class Meta:
        model = Counter
        fields = "__all__"
        read_only_fields = ('id', 'created_at', 'days_passed')

    def get_days_passed(self, obj):
        return obj.days_passed