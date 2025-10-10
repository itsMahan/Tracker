from django.urls import path
from . import views


app_name = 'event'
urlpatterns = [
    path('list', views.EventListView.as_view(), name="list_events"),
    path('add', views.EventCreateView.as_view(), name="create_events"),
    path('update/<int:pk>', views.EventUpdateView.as_view(), name="update_events"),
    path('delete/<int:pk>', views.EventDeleteView.as_view(), name="delete_events"),
]