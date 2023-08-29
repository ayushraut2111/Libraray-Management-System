from django.db import models
from django.contrib.auth.models import User

class Books(models.Model):
    name=models.CharField(max_length=100)
    category=models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name
    
class UserBook(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    book=models.ForeignKey(Books,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.book


class UserInfo(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=100)
    phone=models.IntegerField()
    email=models.EmailField()
    address=models.TextField()
    college=models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
