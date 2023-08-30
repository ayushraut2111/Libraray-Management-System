from rest_framework.serializers import ModelSerializer
from . models import (UserBook,Books)

class UserBookSerializer(ModelSerializer):
    class Meta:
        model=UserBook
        fields='__all__'
    def create(self, validated_data):
        validated_data['user']=self.context['request'].user
        validated_data['number']=self.context['number']
        return UserBook.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.number=self.context['number']
        print(instance.number)
        instance.save()
        return instance


class BookGrpSerializer(ModelSerializer):
    class Meta:
        model=Books
        fields='__all__'
