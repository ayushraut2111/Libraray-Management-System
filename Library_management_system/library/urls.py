from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()

router.register('addbook',views.AddBook)
router.register('adduser',views.AddUser)
router.register('grpbook',views.BookGrp)

urlpatterns = [
    path('',include(router.urls))

]