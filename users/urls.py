from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('user/', views.user_page, name='user'),
    path('admin/', views.admin_page, name='admin'),
]