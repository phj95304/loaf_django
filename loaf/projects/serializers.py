from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

from . import models
from loaf.users import models as user_models


## 프로젝트 아이디와 태그
class TagInfoSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.Project
        fields = (
            'id',
            'tags',
        )


class CountProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'id',
            'file',
            'title',
            'comment_count',
            'like_count',
            'score',
            'apt',
            #'scores_apt'
        )

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image',
            'address',
            'bio',
            'school'
        )

class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__' # export..?



class MemberSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = user_models.User
        fields = (
            'profile_image',
            'username',
            'tags',
        )

class JoinSerializer(serializers.ModelSerializer):

    joiner = MemberSerializer(read_only=True)
    
    class Meta:
        model = models.Join
        fields = (
            'id',
            'joiner',
            'score_apt'
        )

class ProjectSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    join = JoinSerializer(many=True)

    class Meta:
        model = models.Project
        fields = (
            'id',
            'file',
            'title',
            'caption',
            'comments',
            'like_count',
            'creator',
            'tags',
            'score',
            'join',
            'member_count',
            'max_member',
            'schedule',
            'apt',
            ##'scores_apt',
            'project_status',
        )

class InputProjectSerializer(serializers.ModelSerializer):

    tags = TagListSerializerField() #다운받음

    class Meta:
        model = models.Project
        fields = (
            'file',
            'title',
            'caption',
            'max_member',
            'schedule',
            'tags',
            'apt', #필요자질
        )

class APTSerializer(serializers.ModelSerializer):  #지원하기 눌렀을때 자질보여주기

    class Meta:
        model = models.Project
        fields = (
            'apt',
        )

class JoinedProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'title',
            'caption'
        )

class JoinedSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Join
        fields = (
            'project',
            'project_title',
            'project_caption'
        )

class AptScoreInputSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Join
        fields = (
            'score_apt',
        )

