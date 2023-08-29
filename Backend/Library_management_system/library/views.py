from rest_framework.viewsets import ModelViewSet
from . models import (UserBook,UserInfo,Books)
from .serializers import UserBookSerializer,UserInfoSerializer,BookGrpSerializer
from itertools import groupby
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


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
