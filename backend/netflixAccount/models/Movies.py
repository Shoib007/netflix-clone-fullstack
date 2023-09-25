from django.db import models
from .BaseModel import BaseModel

class Movies(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    videoUrl = models.URLField(max_length=500)
    thumbnailUrl = models.URLField(max_length=500)
    genre = models.CharField(max_length=500)
    duration = models.CharField(max_length=10)

    def __str__(self):
        return self.title