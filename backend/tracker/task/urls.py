from django.urls import path
from . import views


app_name = 'task'
urlpatterns = [
    path('list', views.TaskListView.as_view(), name='list_tasks'),
    path('add', views.TaskCreateView.as_view(), name='create_task'),
    path('update/<int:pk>', views.TaskUpdateView.as_view(), name='update_task'),
    path('delete/<int:pk>', views.TaskDeleteView.as_view(), name='delete_task'),
    path('mark/<int:pk>', views.TaskMarkAsDoneView.as_view(), name='mark_task'),
]