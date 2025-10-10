from django.urls import path
from . import views


app_name = 'event'
urlpatterns = [
    path('list', views.EventListView.as_view(), name="list_events"),
    path('add', views.EventCreateView.as_view(), name="create_event"),
    path('update/<int:pk>', views.EventUpdateView.as_view(), name="update_event"),
    path('delete/<int:pk>', views.EventDeleteView.as_view(), name="delete_event"),
    path('reset/<int:pk>', views.EventResetView.as_view(), name="reset_event"),
    path('increase/<int:pk>', views.EventIncreaseView.as_view(), name="increase_event"),
    path('decrease/<int:pk>', views.EventDecreaseView.as_view(), name="decrease_event"),
]