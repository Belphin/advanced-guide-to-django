from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from .constants import UserRoleChoice
from .managers import UserManager, UserManagerAll

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=55, blank=True)
    last_name = models.CharField(max_length=55, blank=True)
    role = models.PositiveSmallIntegerField(choices=UserRoleChoice.choices)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserManager()

    objects_all = UserManagerAll()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = ["-id"]