from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router=DefaultRouter()

router.register('addbook',views.AddBook)
router.register('adduser',views.AddUser)
router.register('grpbook',views.BookGrp)

urlpatterns = [
    path('',include(router.urls)),
        path('api/token/ ', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('signup/',views.Signup.as_view()),
        path('login/',views.Login.as_view())


]