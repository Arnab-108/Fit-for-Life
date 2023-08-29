from django.shortcuts import get_object_or_404
from django.http import HttpResponse,JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.decorators import api_view
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
            user = User(username=username , email=email , age=age, location=location , gender = gender , profile_image="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg")
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

@api_view(['GET', 'PATCH'])
def user_detail(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = {
            'user_id': str(user.id),
            'username': user.username,
            'age': user.age,
            'location': user.location,
            'gender': user.gender,
            'profile_image': user.profile_image
            # Add any other user-related information here
        }
        return Response(data, status=status.HTTP_200_OK)
    
    elif request.method == 'PATCH':
        new_username = request.data.get('username')
        new_age = request.data.get('age')
        new_location = request.data.get('location')
        new_gender = request.data.get('gender')
        new_profile = request.data.get('profile_image')
        if new_username:
            user.username = new_username
        if new_age:
            user.age = new_age
        if new_location:
            user.location = new_location
        if new_gender:
            user.gender = new_gender
        if new_profile:
            user.profile_image = new_profile
        
        user.save()
        return Response({'message': 'User details updated successfully.'}, status=status.HTTP_200_OK)