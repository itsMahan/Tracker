from django.urls import path
from . import views


urlpatterns = [
    path('list', views.CounterListView.as_view(), name='list_counters'),
    path('add', views.CounterCreateView.as_view(), name='create_counter'),
    path('update/<int:pk>', views.CounterUpdateView.as_view(), name='update_counter'),
    path('delete/<int:pk>', views.CounterDeleteView.as_view(), name='delete_counter'),
]