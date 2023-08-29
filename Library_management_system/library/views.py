from rest_framework.viewsets import ModelViewSet
from . models import (UserBook,UserInfo,Books)
from .serializers import UserBookSerializer,UserInfoSerializer,BookGrpSerializer
from itertools import groupby
from rest_framework.response import Response


class BookGrp(ModelViewSet):
    queryset=Books.objects.all()
    serializer_class=BookGrpSerializer

    def list(self, request, *args, **kwargs):
        values = [
    {'category': k, 'records': list(g)} for k, g in groupby(Books.objects.order_by('category').values(), lambda x: x['category'])]
        print(values)
        return Response(values)


class AddBook(ModelViewSet):
    queryset=UserBook.objects.all()
    serializer_class=UserBookSerializer

class AddUser(ModelViewSet):
    queryset=UserInfo.objects.all()
    serializer_class=UserInfoSerializer


[{'category': 'Comedy', 'records': [{'id': 5, 'name': 'Champak', 'category': 'Comedy'}, {'id': 6, 'name': 'Tenaliraman', 'category': 'Comedy'}]}, {'category': 'Fiction', 'records': [{'id': 3, 'name': 'Alchemist', 'category': 'Fiction'}, {'id': 4, 'name': 'Brave New World', 'category': 'Fiction'}]}, {'category': 'Sci-Fi', 'records': [{'id': 1, 'name': 'The Lost World', 'category': 'Sci-Fi'}, {'id': 2, 'name': 'Dune', 'category': 'Sci-Fi'}]}]