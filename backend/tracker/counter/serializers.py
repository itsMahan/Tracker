from rest_framework import serializers
from .models import Counter
from django.utils.timezone import now


class CounterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    days_passed = serializers.SerializerMethodField()
    class Meta:
        model = Counter
        fields = "__all__"
        read_only_fields = ('id', 'created_at', 'days_passed')

    def validate_start_date(self, value):
        if value > now().date():
            raise serializers.ValidationError("start_date can not be in the future")
        return value

    def get_days_passed(self, obj):
        return obj.days_passed