from django.db import models
from datetime import date
from django.utils.timezone import now
from django.core.exceptions import ValidationError
# from ..accounts.models import Profile


# Create your models here.


class Counter(models.Model):
    user = models.ForeignKey('accounts.Profile', on_delete=models.CASCADE, related_name='counters')
    title = models.CharField(max_length=255)
    start_date = models.DateField(default=date.today)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def days_passed(self):
        days = (now().date() - self.start_date).days
        return days

    def clean(self):
        if self.start_date > now().date():
            raise ValidationError({'start_date': 'can not be in the future!'})
