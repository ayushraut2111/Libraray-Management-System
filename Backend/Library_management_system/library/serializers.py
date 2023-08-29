from rest_framework.serializers import ModelSerializer
from . models import (UserBook,UserInfo,Books)

class UserBookSerializer(ModelSerializer):
    class Meta:
        model=UserBook
        fields='__all__'

class UserInfoSerializer(ModelSerializer):
    class Meta:
        model=UserInfo
        fields='__all__'

class BookGrpSerializer(ModelSerializer):
    class Meta:
        model=Books
        fields='__all__'
