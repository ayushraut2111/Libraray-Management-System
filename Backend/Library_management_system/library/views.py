from rest_framework.viewsets import ModelViewSet
from . models import (UserBook,UserInfo,Books)
from .serializers import UserBookSerializer,BookGrpSerializer
from itertools import groupby
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken

class Signup(APIView):
    authentication_classes=[]
    permission_classes=[]
    def post(self,request):
        name=request.data['username']
        email=request.data['email']
        pass1=request.data['password1']
        pass2=request.data['password2']
        if pass1==pass2: 
            if User.objects.filter(email=email).exists():
                return Response({"msg":"Email already registered please sign in"},status=status.HTTP_400_BAD_REQUEST)
            elif User.objects.filter(username=name).exists():
                return Response({"msg":"Username exists please use different username"},status=status.HTTP_400_BAD_REQUEST)
            else:
                usr=User.objects.create_user(username=name,email=email,password=pass1)
                usr.save()
                dic=request.data
                usrinfo=UserInfo.objects.create(user=usr,name=dic['name'],phone=dic['phone'],email=email,address=dic['address'],college=dic['college'])
                usrinfo.save()
                return Response({"msg":"User created"},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"msg":"Password not matched"},status=status.HTTP_400_BAD_REQUEST)
        

class Login(APIView):
    authentication_classes=[]
    permission_classes=[]
    def post(self,request):
        name=request.data['username']
        password=request.data['password']
        usr=auth.authenticate(username=name,password=password)
        if usr is not None:
            refresh = RefreshToken.for_user(usr)
            return Response({"msg":"User logged in", 'token':{'refresh': str(refresh),'access': str(refresh.access_token)}},status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"msg":"Please enter valid credentials"},status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    authentication_classes=[]
    permission_classes=[]
    def get(self,request):
        auth.logout(request)
        return Response({"msg":"Logout successfull"},status=status.HTTP_202_ACCEPTED)




class BookGrp(ModelViewSet):
    queryset=Books.objects.all()
    serializer_class=BookGrpSerializer

    def list(self, request, *args, **kwargs):
        values = [{'category': k, 'records': list(g)} for k, g in groupby(Books.objects.order_by('category').values(), lambda x: x['category'])]
        return Response(values)


class AddBook(ModelViewSet):
    queryset=UserBook.objects.all()
    serializer_class=UserBookSerializer
    def get_queryset(self):
        return UserBook.objects.filter(user=self.request.user)
    def create(self, request, *args, **kwargs):
        if UserBook.objects.filter(book=request.data['book'],user=self.request.user).exists():  # if book is already present in cart 
            usr=UserBook.objects.filter(book=request.data['book'],user=self.request.user)  # then get the book from the db and update its count so for that first get the count
            lst=list(usr.values())
            # print(lst[0]['number'])
            id=lst[0]['id']
            ins=UserBook.objects.get(id=id)  # for updating we get previous instance so get by its id
            # print(ins)
            ser=UserBookSerializer(ins,data=request.data,context={'request':request,'number':lst[0]['number']+1})  # then update the data
            if ser.is_valid():
                ser.save()
                return Response({"msg":"Book added to cart successfully"},status=status.HTTP_202_ACCEPTED)
        else:   # if book is not present in cart then simply save it in database with its count 1
            ser=UserBookSerializer(data=request.data,context={'request':request,'number':1})
            if ser.is_valid():
                ser.save()
                return Response({"msg":"Book added to cart successfully"},status=status.HTTP_202_ACCEPTED)
        return Response({"msg":"Invalid Request"},status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request,pk):
        # print(pk,request.data)
        usr=list(UserBook.objects.filter(id=pk).values())
        # print(usr)
        quant=usr[0]['number']
        if quant==1:
            ins=UserBook.objects.get(id=pk)
            ins.delete()
            return Response({"msg":"Item removed"},status=status.HTTP_202_ACCEPTED)
        else:
            ins=UserBook.objects.get(id=pk)
            # print(ins,quant)
            ser=UserBookSerializer(ins,data=request.data,partial=True,context={'request':request,'number':quant-1})
            if ser.is_valid():
                ser.save()
                return Response({"msg":"Item removed"},status=status.HTTP_202_ACCEPTED)
            return Response({"msg":"Invalid Response"},status=status.HTTP_400_BAD_REQUEST)
