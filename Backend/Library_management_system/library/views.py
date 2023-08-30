from rest_framework.viewsets import ModelViewSet
from . models import (UserBook,UserInfo,Books)
from .serializers import UserBookSerializer,UserInfoSerializer,BookGrpSerializer
from itertools import groupby
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken


class Signup(APIView):
    def post(self,request):
        print(request.data)
        name=request.data['username']
        email=request.data['email']
        pass1=request.data['password1']
        pass2=request.data['password2']
        print(name,email,pass1,pass2)
        if pass1==pass2:
            if User.objects.filter(email=email).exists():
                return Response({"msg":"email already registered please login"},status=status.HTTP_400_BAD_REQUEST)
            elif User.objects.filter(username=name).exists():
                return Response({"msg":"username exists please use different username"},status=status.HTTP_400_BAD_REQUEST)
            else:
                usr=User.objects.create_user(username=name,email=email,password=pass1)
                usr.save()
                return Response({"msg":"user created"},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"msg":"password not matched"},status=status.HTTP_400_BAD_REQUEST)
        

class Login(APIView):
    def post(self,request):
        print(request.data)
        name=request.data['username']
        password=request.data['password']
        usr=auth.authenticate(username=name,password=password)
        if usr is not None:
            refresh = RefreshToken.for_user(usr) 
            return Response({"msg":"user logged in", 'token':{'refresh': str(refresh),'access': str(refresh.access_token)}},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"msg":"please enter valid credentials"},status=status.HTTP_400_BAD_REQUEST)





class BookGrp(ModelViewSet):
    queryset=Books.objects.all()
    serializer_class=BookGrpSerializer

    def list(self, request, *args, **kwargs):
        values = [
    {'category': k, 'records': list(g)} for k, g in groupby(Books.objects.order_by('category').values(), lambda x: x['category'])]
        return Response(values)


class AddBook(ModelViewSet):
    queryset=UserBook.objects.all()
    serializer_class=UserBookSerializer

class AddUser(ModelViewSet):
    queryset=UserInfo.objects.all()
    serializer_class=UserInfoSerializer
