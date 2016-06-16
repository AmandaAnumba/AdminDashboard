from django.db import models
from django.contrib.auth.models import User
from django_mysql.models import ListCharField, SizedTextField, EnumField
from django.utils import timezone


class Member(models.Model):
    USER_ROLES = (
        ('F', 'Founder'),
        ('M', 'Member'),
        ('C', 'Contributor'),
        ('W', 'Staff Writer')
    )
    user                 = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar               = models.ImageField(blank=True)
    role                 = models.CharField(max_length=1, choices=USER_ROLES, default="M", editable=False)
    bio                  = SizedTextField(size_class=2, blank=True)
    linkedin             = models.CharField(max_length=128, blank=True)
    pinterest            = models.CharField(max_length=128, blank=True)
    facebook             = models.CharField(max_length=128, blank=True)
    instagram            = models.CharField(max_length=128, blank=True)
    twitter              = models.CharField(max_length=128, blank=True)
    tumblr               = models.CharField(max_length=128, blank=True)
    website              = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return self.user.username



class Topic(models.Model):
    name                 = models.CharField(max_length=255, unique=True)
    is_parent            = models.BooleanField(default=False)
    subcategory          = models.ManyToManyField("self", blank=True)
    image                = models.ImageField(upload_to='images/', blank=True)
    description          = SizedTextField(size_class=2, blank=True)

    def __str__(self):
        return self.name



class Article(models.Model):
    article_style        = EnumField(choices=['informational', 'opinion'])
    article_type         = EnumField(choices=['feature', 'regular'])
    author               = models.ForeignKey('auth.User')
    category             = models.ManyToManyField(Topic, related_name="topics", related_query_name="category", blank=True)
    co_author            = models.CharField(max_length=64, blank=True)
    content              = models.TextField(blank=True)
    created_at           = models.DateTimeField(default=timezone.now, editable=False)
    cycle                = models.ForeignKey('Cycle')
    cycle_article        = models.BooleanField(default=False)
    description          = SizedTextField(size_class=2, blank=True)
    feature_image        = models.ImageField(blank=True)
    header_image         = models.ImageField(blank=True)
    photo_credit         = models.CharField(max_length=255, blank=True)
    published_date       = models.DateTimeField(blank=True)
    search_terms         = ListCharField(
                            base_field=models.CharField(max_length=36, blank=True), 
                            size=20,
                            max_length=(20*37),
                            blank=True
                         )
    slug                 = models.CharField(max_length=255, blank=True, editable=False)
    status               = EnumField(choices=['published', 'queued', 'ready', 'draft'])
    tags                 = ListCharField(
                            base_field=models.CharField(max_length=36, blank=True), 
                            size=20,
                            max_length=(20*37),
                            blank=True
                         )
    title                = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title



class Comment(models.Model):
    article_id           = models.ForeignKey('Article', on_delete=models.CASCADE)
    comment              = models.CharField(max_length=255)
    status               = EnumField(choices=['pending', 'reviewed'], default='pending')
    timestamp            = models.DateTimeField(default=timezone.now, editable=False)
    user_id              = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.comment



class Cycle(models.Model):
    title                = models.CharField(max_length=255, unique=True)
    number               = models.IntegerField(unique=True)
    description          = SizedTextField(size_class=2, blank=True)
    image                = models.ImageField(blank=True)
    articles             = models.ManyToManyField(Article, related_name="cycles", related_query_name="rotation", blank=True)
    is_current           = models.BooleanField(default=False)

    def __str__(self):
        return self.title