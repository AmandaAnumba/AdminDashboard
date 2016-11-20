from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.write, name='write'),
    url(r'^id\=(?P<article_id>\d+)/$', views.edit, name='edit'),
    # url(r'comments/(?:page-(?P<page_number>\d+)/)?$', comments)
    # url(r'^editor/q/(?P<id>)/$', views.reread),
    # url(r'^editor/p/(?P<id>)/$', views.proof),
    # url(r'^submit/$', views.submit),
    # url(r'^update/$', views.update),
    # url(r'^queue/$', views.queue),
    # url(r'^publish/$', views.publish),
    # url(r'^delete/$', views.delete),
]