from django.conf.urls import url
from . import views

app_name='users'
urlpatterns = [
    url(
        regex=r'^explore/$',
        view=views.ExploreUsers.as_view(),
        name='explore_users'
    ),
    url(
        regex=r'^startUserApriori/$',
        view=views.TagUserInfo.as_view(),
        name='tag_info'
    ),
    url(
        regex=r'^(?P<username>\w+)/findRecomUsers/$',
        view=views.UsersRecommand.as_view(),
        name="Recommend_user"
    ),
    url(
        regex=r'^startProjectApriori/$',
        view=views.TagUserProjectInfo.as_view(),
        name='tag_info'
    ),
    url(
        regex=r'^(?P<username>\w+)/findRecomProjects/$',
        view=views.ProjectsRecommand.as_view(),
        name="Recommend_user"
    ),
    # url(
    #     regex=r'^recommand/$',
    #     view=views.UsersRecommand.as_view(),
    #     name='recommand_users'
    # ),
    # url(
    #     regex=r'^(?P<username>\w+)/recommand/$',
    #     view=views.RecommandUser.as_view(),
    #     name='user_recommand'
    # ),
    url(
        regex=r'^(?P<username>\w+)/$',
        view=views.UserProfile.as_view(),
        name='user_profile'
    ),
    
    url(
        regex=r'^(?P<username>\w+)/joinedProjects/$',
        view=views.JoinedProject.as_view(),
        name="joined_projects"
    ),
    url(
        regex=r'(?P<user_id>[0-9]+)/follow/$',
        view=views.FollowUser.as_view(),
        name='follow_user'
    ),
    url(
        regex=r'(?P<user_id>[0-9]+)/unfollow/$',
        view=views.UnFollowUser.as_view(),
        name='unfollow_user'
    ),
    url(
        regex=r'^(?P<username>\w+)/followers/$',
        view=views.UserFollowers.as_view(),
        name='user_followers'
    ),
    url(
        regex=r'^(?P<username>\w+)/following/$',
        view=views.UserFollowing.as_view(),
        name='user_following'
    ),
]