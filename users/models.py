from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=True, null=True)
    full_name = models.CharField(max_length=120, blank=True, null=True)
    role = models.CharField(max_length=20, default='user', choices=[
        ('admin', 'Admin'),
        ('user', 'User'),
        ('guest', 'Guest'),
    ])

    # Thêm related_name cho groups và user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='customuser_groups',  # Tùy chỉnh tên reverse accessor
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_permissions',  # Tùy chỉnh tên reverse accessor
    )

    def __str__(self):
        return self.username