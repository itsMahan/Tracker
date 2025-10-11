from django.db import models
from django.conf import settings

# Create your models here.


class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    total = models.IntegerField(null=True, blank=True, )
    used = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def remainig_events(self):
        if self.total:
            return self.total - self.used
        else:
            return None