from django.urls import path, re_path
from . import views

urlpatterns=[
    path("", views.my_view , name="my_view")
]