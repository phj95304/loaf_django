import sys, os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from . import apriori_user as startApriori
from . import apriori_match_user as startAprioriMatch
from . import apriori_project as startApriori_project
from . import apriori_match_project as startAprioriMatch_project
from loaf.projects import models as project_models
from loaf.projects import serializers as project_serializers
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class ExploreUsers(APIView):
    
    def get(self, request, format=None):
        all_users = models.User.objects#.all().order_by('-date_joined')
        serializer = serializers.ListUserSerializer(all_users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.add(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)

class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)

class Search(APIView):

    def get(self, request, format=None):

        username = request.query_params.get('username', None)

        if username is not None:

            users = models.User.objects.filter(username__istartswith=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):

    def get_user(self, username):

        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None


    def get(self, request, username, format=None):

        found_user = self.get_user(username)

        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, username, format=None):

        user = request.user
        found_user = self.get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = serializers.InputProfileSerializer(
                found_user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else:

                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.add(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UserFollowers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserFollowing(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(
            user_following, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user
        
        if user.username == username :

            current_password = request.data.get('current_password', None)

            if current_password is not None :

                passwords_match = user.check_password(current_password)

                if passwords_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else :

                        return Response(status=status.HTTP_400_BAD_REQUEST)
                
                else :

                    return Response(status=status.HTTP_400_BAD_REQUEST)
                
            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
            
class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter



# class RecommandUser(APIView):

#     def get(self, request, format=None):
        
#         user = request.user

#         print(user.address)

#         ##for i in all_users:
#            ## all_users_tags.append(all_users[i].tags.all())

#         ##print(all_users_tags)

#         serializer = serializers.UserProfileSerializer(user, many=True)

#         return Response(data=serializer.data, status=status.HTTP_200_OK)

# class UsersRecommand(APIView):

#     def get(self, request, format=None):

#         recommand = models.User.objects.all().reverse()[1:4]

#         serializer = serializers.ListUserSerializer(recommand, many=True)

#         return Response(data=serializer.data, status=status.HTTP_200_OK)

class JoinedProject(APIView):

    def get(self, request, username, fomat=None):

        found_user = models.User.objects.get(username=username)

        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)

        found_joined = project_models.Join.objects.filter(joiner=found_user)

        serializer = project_serializers.JoinedSerializer(found_joined, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TagUserInfo(APIView):
    def get(self, request, format=None):
        tag_data = models.User.objects.all()

        serializer = serializers.TagInfoSerializer(tag_data, many=True)
        with open('input_raw_user.txt', 'w') as the_file:
            for i in serializer.data:
                i = list(i.items())
               
                tag_list_item = str(i[1])
                tag_list_item = tag_list_item.split(",")
                
                tag_list_item = tag_list_item[1]
                if tag_list_item == " [])":
                    print("[]) 실행됨")
                    continue
                  
                i = str(i) 
                
                print(i)
                the_file.writelines(i)
                the_file.write('\n') 

        startApriori.main()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UsersRecommand(APIView):## 유저별 유저 추천
    
    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None
    def get(self, request, username, format=None):
        found_user = self.get_user(username)
        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.TargetUserTagSerializer(found_user)
        print("--------")
        print(serializer.data)
        tag = serializer.data
        tag = str(tag)
        print(tag)
        tag = tag.replace("{'tags': [","")
        tag = tag.replace("]}","")
        tag = tag.replace("'","")
        print(tag)
        tag = tag.split(",")
        print(tag)
        username = username
        startAprioriMatch.main(tag,username)
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    def get_match_username(username):
        match_username = username
        print(match_username)
        
class TagUserProjectInfo(APIView):
    def get(self, request, format=None):
        tag_data = models.User.objects.all()

        serializer = serializers.TagInfoSerializer(tag_data, many=True)
        with open('input_raw_project.txt', 'w', encoding = 'utf-8') as the_file:
            for j in serializer.data: ## 유저 아이디랑 태그
                j = list(j.items())
                print(j)
                print("----------")
                userName = str(j[0])
                userName = userName.split(",")
                userName = userName[1]
                userName = userName.replace(" '","")
                userName = userName.replace("'","")
                userName = userName.replace(")","")
                print(userName)

                userTag = str(j[1])
                print(userTag)
                if userTag == "('tags', [])": ## 빈 태그 제거
                    print("유저 태그 없음")
                    continue
                userTag = userTag.split(",")
                userTag = userTag[1]+"/"+userTag[2]+"/"+userTag[3]
                userTag = userTag.replace("'", "")
                userTag = userTag.replace("[", "")
                userTag = userTag.replace(" ", "")
                userTag = userTag.replace("])", "")
                print(userTag)

                projectIdTag = str(j[2]) ## project가 튜플로 id와tag가 같이 있음
                # print(projectIdTag)
                if projectIdTag  == "('projects', [])": ## 빈 태그 제거
                    print("마스터 프로젝트 없음")
                    continue

                projectIdTag = projectIdTag.split("OrderedDict")
                for i in range(1,len(projectIdTag)):
                    pro = projectIdTag[i]
                    #print(pro)
                    pto = str(pro).split(",")
                    projectId = pto[1]
                    projectId = projectId.replace(")", "")
                    projectId = projectId.replace(" ", "")
                    
                    projectTag = pto[3]+"/"+pto[4]+"/"+pto[5]
                    projectTag = projectTag.replace("])", "")
                    projectTag = projectTag.replace("[", "")
                    projectTag = projectTag.replace("'", "")
                    projectTag = projectTag.replace(" ", "")
                    print(projectId)
                    print(projectTag)
                    print("****************")
                    
                    line =  userName+"," + projectId+"," + userTag+"/" + projectTag + "\n"
                    the_file.write(str(line))
                    
                    print(line)
                
                print("------%----")
                  

        startApriori_project.main()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ProjectsRecommand(APIView):## 유저별 유저 추천
    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None
    def get(self, request, username, format=None):
        found_user = self.get_user(username)
        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.TargetUserTagSerializer(found_user)
        print("--------")
        print(serializer.data)
        tag = serializer.data
        tag = str(tag)
        print(tag)
        tag = tag.replace("{'tags': [","")
        tag = tag.replace("]}","")
        tag = tag.replace("'","")
        print(tag)
        tag = tag.split(",")
        print(tag)
        username = username
        startAprioriMatch_project.main(tag, username)
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    def get_match_projectId(projectId):
        match_projectId = projectId
        print(projectId)