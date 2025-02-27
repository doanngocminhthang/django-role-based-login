from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
# Create your views here.
def home(request):
    return render(request, 'users/home.html')  # Render template home.html

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body) if request.body else {}
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'user')
        email = data.get('email', None)
        full_name = data.get('full_name', None)

        if not username or not password:
            return JsonResponse({'message': 'Username and password are required'}, status=400)
        
        from .models import CustomUser
        if CustomUser.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'}, status=400)
        
        user = CustomUser.objects.create_user(username=username, password=password, role=role, email=email, full_name=full_name)
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    return render(request, 'users/register.html')

def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body) if request.body else {}
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'message': 'Username and password are required'}, status=400)
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        return JsonResponse({'message': 'Invalid credentials'}, status=401)
    return render(request, 'users/login.html')

@login_required
def user_page(request):
    return JsonResponse({'message': f'Welcome, {request.user.role}!'}, status=200)

@login_required
def admin_page(request):
    if request.user.role != 'admin':
        return JsonResponse({'message': 'Admin access required'}, status=403)
    return JsonResponse({'message': 'Welcome, Admin!'}, status=200)