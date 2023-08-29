from django.contrib import admin

from . models import (Books,UserBook,UserInfo)

@admin.register(Books)
class BooksRegister(admin.ModelAdmin):
    list_display=['id','name','category']

@admin.register(UserBook)
class UserBookRegister(admin.ModelAdmin):
    list_display=['id','user','book']
    
@admin.register(UserInfo)
class UserInfoRegister(admin.ModelAdmin):
    list_display=['id','user','name','phone','email','college']
