from django.urls import path
from base.views import store_views as views



urlpatterns = [
    path('', views.getStores, name="stores"),


]
