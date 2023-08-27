from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated
from .models import User


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# Create your views here.
def my_view(request):
    return HttpResponse("Hello!")


class SignupView(APIView):
    def post(self, request):
        # Get data from request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        age = request.data.get('age')
        location = request.data.get('location')
        gender = request.data.get('gender')
        # Check if username, password, and age are provided
        if not username or not password or not age or not email:
            return Response({'error': 'Username, password, age and email are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a new user instance
            user = User(username=username , email=email , age=age, location=location , gender = gender)
            # Hash and set the user's password
            user.set_password(password)
            # Save the user instance to the database
            user.save()
            return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Could not create user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            # Convert ObjectId to string
            user_id_str = str(user.id)

            # Create a payload with user information
            payload = {
                'user_id': user_id_str,
                'username': user.username,
                # Add any other user-related information here
            }

            print(payload)
            # Encode the payload to generate a JWT token
            token = jwt_encode_handler(payload)

            return Response({'msg':"Login Successful!",'token': token , 'info':payload}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        
# ....................................................................Authorization..............................................................................

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    print(permission_classes)
    def get(self, request):
        print("UserDetailView GET method reached.")
        user = request.user
        data = {
            'user_id': str(user.id),
            'username': user.username,
            'age': user.age,
            'location': user.location,
            'gender': user.gender,
        }
        return Response(data, status=status.HTTP_200_OK)