from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.login_view, name="login"),
    url(r'^register/$', views.register, name="register"),
    url(r'^reset/$', views.reset, name="reset"),
    url(r'^logout/$', views.logout_view, name="logout"),
    url(r'^dashboard/$', views.dashboard, name="dashboard"),
    url(r'^dashboard/profile/$', views.profile, name="profile"),
    url(r'^dashboard/articles/$', views.articles, name="articles"),
]