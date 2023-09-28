from django.db import models

class UserRoleChoice(models.IntegerChoices):
  READER = 0
  BLOGGER = 1