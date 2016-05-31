from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^userlogin/$', views.userlogin),
    url(r'^dashboard/$', views.dashboard),
]