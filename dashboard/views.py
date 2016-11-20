from django.conf import settings
from django.contrib.auth import views, authenticate, login, logout
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.contrib.auth.views import password_reset
from django.core import serializers
from django.core.mail import send_mail
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods

import boto3, botocore

import json, time, os

from .models import *


# init boto3 client
client = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY,
    aws_secret_access_key=settings.AWS_SECRET_KEY,
)


# Global Variables
# ------------------
CYCLE = Cycle.objects.get(is_current=True)
DEBUG = settings.DEBUG
V = '2016-06-04-1350'
DATA = {
    'page': '',
    'version': V,
    'hasPageJS': True,
    'hasPageCSS': True,
    'debug': DEBUG,
    'cycle': CYCLE,
    'loggedIn': False
}


def index(request):
    if 'username' in request.session:
        return redirect(dashboard)
    else:
        PAGEDATA = {}
        PAGEDATA.update(DATA)
        PAGEDATA['page'] = 'login'
        return render(request, 'pages/login.html', {'data': PAGEDATA})


@csrf_protect
@require_http_methods(["POST"])
def login_view(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        username = body['username']
        password = body['password']

        user = authenticate(username=username, password=password)
        u = User.objects.get(username=username)

        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['username'] = username
                return JsonResponse({ 'success': ""})
            else:
                return JsonResponse({ 'error': 'Your account has been disabled. Please contact <email> for assistance.'})
        else:
            return JsonResponse({ 'error': "The username/password combination is incorrect."})
    else:
        return redirect(index)


@csrf_protect
@require_http_methods(["POST"])
def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email'].lower()
        password = request.POST['password']
        
        u = User.objects.create_user(username, email, password)

        if u is not None:
            request.session['username'] = username
            return JsonResponse({ 'success': "Registration successful. You are now logged in." })
        else:
            print("error while registering")
            return JsonResponse({'error': result })
    else:
        return redirect(index)


@csrf_protect
@require_http_methods(["POST"])
def reset(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        email = body['email']

        u = User.objects.get(email=email)

        if u is not None:
            if u.is_active:
                try:
                    return password_reset(request, html_email_template_name="emails/password_reset.html", 
                                subject_template_name="emails/password_reset-subject.txt",
                                post_reset_redirect = "/dashboard/")
                    # return JsonResponse({ 'success': "If we have the provided email address on file, an email will be sent containing instruction to help you with your account." })
                except:
                    return JsonResponse({ 'error': "An error occured while processing your request. Please refresh the page to try again." })
        else:
            return JsonResponse({ 'error': "An error occured while processing your request. Please refresh the page to try again." })
    else:
        return redirect(index)


def logout_view(request):
    logout(request)
    return redirect(index)


def dashboard(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'dashboard'

    if request.user.is_authenticated():
        a = Article.objects.all()
        user = User.objects.get(username=request.session['username'])
        u = Member.objects.get(user=user)

        drafts = a.filter(status='draft', author=user)
        review = a.filter(status='ready')
        queue = a.filter(status='queued')

        return render(request, 'pages/dashboard.html', 
            {
                'data': PAGEDATA,
                'drafts': drafts,
                'review': review,
                'queue': queue,
                'user': u
            })
    else:
        return redirect(index)


@csrf_protect
@require_http_methods(["GET", "POST"])
def profile(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'profile'

    user = User.objects.get(username=request.session['username'])
    m = Member.objects.get(user=user)
    
    if request.user.is_authenticated():
        if request.method == 'GET':
            return render(request, 'pages/profile.html', 
            {
                'data': PAGEDATA,
                'user': m,
            })

        elif request.method == 'POST':
            body = json.loads(request.body.decode('utf-8'))

            try:
                m.avatar     = body['avatar']
                m.bio        = body['bio']
                m.linkedin   = body['linkedin']
                m.pinterest  = body['pinterest']
                m.facebook   = body['facebook']
                m.instagram  = body['instagram']
                m.twitter    = body['twitter']
                m.tumblr     = body['tumblr']
                m.website    = body['website']
                m.save()

                user.email       = body['email']
                user.first_name  = body['first_name']
                user.last_name   = body['last_name']
                user.save()
                return JsonResponse({ 'success': "Your profile has been updated. Redirecting you to the home page now..."})

            except Exception as e:
                print(e)
                return JsonResponse({ 'error': "We were unable to update your profile. Please refresh the page to try again."})
    else:
        return redirect(index)


@require_http_methods(["GET"])
def articles(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'articles'

    if request.user.is_authenticated():
        limit = 15
        a = Article.objects.all()[:limit]
        user = User.objects.get(username=request.session['username'])
        u = Member.objects.get(user=user)

        return render(request, 'pages/articles.html', 
            {
                'data': PAGEDATA,
                'articles': a,
                'user': u
            })
    else:
        return redirect(index)


@csrf_protect
@require_http_methods(["POST"])
def load_articles(request):
    body = json.loads(request.body.decode('utf-8'))
    page = int(body['page'])
    
    limit = 15
    lower = page * limit + 1
    upper = lower + limit
    
    a = Article.objects.all()[lower:upper]
    obj = serializers.serialize('json', a)

    return JsonResponse({ 'articles': obj })


@csrf_protect
@require_http_methods(["POST"])
def get_article(request):
    body = json.loads(request.body.decode('utf-8'))
    articleId = body['id']
    
    a = Article.objects.all().filter(id=articleId)
    obj = serializers.serialize('json', a)

    return JsonResponse({ 'article': obj })


@require_http_methods(["GET"])
def gallery(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'gallery'

    pics = []

    if request.user.is_authenticated():
        user = User.objects.get(username=request.session['username'])
        u = Member.objects.get(user=user)
        
        response = client.list_objects(Bucket='chicreptawr', Prefix='articles')['Contents']
        for key in response:
            x = key['Key']
            
            if ( x != "articles/" ):
                pics.append(x)

        return render(request, 'pages/gallery.html', 
            {
                'data': PAGEDATA,
                'user': u,
                'pics': pics
            })
    else:
        return redirect(index)



