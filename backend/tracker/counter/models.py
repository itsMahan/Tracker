from django.contrib.admin.templatetags.admin_list import date_hierarchy
from django.db import models
from django.contrib.auth.models import User
from datetime import date
from django.utils.timezone import now
# Create your models here.


class Counter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='counters')
    title = models.CharField(max_length=255)
    start_date = models.DateField(default=date.today)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def days_passed(self):
        days = (now().date() - self.start_date).days
        return days
