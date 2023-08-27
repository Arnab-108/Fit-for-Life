from django.urls import path, re_path
from . import views
from .views import SignupView, LoginView, UserDetailView

urlpatterns=[
    path("", views.my_view , name="my_view"),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user'),
]