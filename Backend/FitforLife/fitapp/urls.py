from django.urls import path, re_path
from . import views
from .views import SignupView, LoginView, user_detail,TrainerSignupView,TrainerLoginView,tariner_detail,CreateWorkoutPlanView,GetTrainerWorkoutPlans

urlpatterns=[
    path("", views.my_view , name="my_view"),
    path('signup/', SignupView.as_view(), name='signup'),
    path('signuptrainer/' , TrainerSignupView.as_view() , name='signuptrainer'),
    path('logintrainer/' , TrainerLoginView.as_view() , name='logintrainer'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/<str:user_id>/', user_detail, name='user_detail'),
    path('trainer/<str:user_id>/',tariner_detail , name="trainer_detain" ),
    path('create-workout-plan/', CreateWorkoutPlanView.as_view(), name='create-workout-plan'),
    path('trainers/<str:trainer_id>/workout-plans/', GetTrainerWorkoutPlans.as_view(), name='get-trainer-workout-plans'),
]