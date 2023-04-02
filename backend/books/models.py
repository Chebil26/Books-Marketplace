from django.db import models

class Book(models.Model):
    isbn= models.CharField(max_length=255, null=True, blank=True )
    title = models.CharField(max_length=255, null=True, blank=True)
    cover = models.ImageField(null=True, blank=True,default='/placeholder.png')
    author = models.CharField(max_length=255, null=True, blank=True)
    year = models.CharField(max_length=255, null=True, blank=True )
    description = models.TextField(null=True, blank=True)
    num_pages = models.CharField(max_length=255, null=True, blank=True )

    def __str__(self):
        return self.title
