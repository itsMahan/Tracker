from django.urls import path
from . import views


app_name = 'task'
urlpatterns = [
    path('list', views.TaskListView.as_view(), name='tasks_list'),
]