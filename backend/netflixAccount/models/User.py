from django.contrib.auth.models import AbstractUser
from django.db import models
from .BaseModel import BaseModel
from .userManager import UserManager

class User(AbstractUser, BaseModel):
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['username']

    objects = UserManager()

    def __str__(self) -> str:
        return self.email