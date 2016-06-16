from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth import views, authenticate, login, logout
from django.contrib.auth.views import password_reset
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.db.models import Q

import json, time

from slugify import slugify

from .models import *
from .forms import *


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
ARTICLES = {
    'drafts':'',
    'all':'',
    'ready':''
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
            return JsonResponse({ 'error': "The username and/or password were incorrect."})
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
            if user.is_active:
                try:
                    password_reset(request, 
                                html_email_template_name="emails/password_reset.html", 
                                subject_template_name="emails/password_reset-subject.txt",
                                post_reset_redirect = "/")
                    return JsonResponse({ 'success': "If we have the provided email address on file, an email will be sent containing instruction to help you with your account." })
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

    a = Article.objects.all()
    u = User.objects.get(username=request.session['username'])

    drafts = a.filter(status='draft', author=u)
    print(drafts)

    return render(request, 'pages/dashboard.html', 
        {
            'data': PAGEDATA,
            'drafts': drafts,
            'user': u
        })


def profile(request):
    username = request.session['username']
    print(username)
    
    if request.user.is_authenticated():
        if request.method == 'GET':
            PAGEDATA = {}
            PAGEDATA.update(DATA)
            PAGEDATA['page'] = 'profile'
            
            # get the form
            form = MemberForm()

            # get the current user
            u = User.objects.get(username=username)

            if u is not None:
                return render(request, "pages/profile.html", {'name':username, 'form':form, 'user':u, 'data':PAGEDATA})

    # elif request.method == 'POST':
    #     updates = {}
        
    #     data = json.loads(request.data.decode('utf-8'))

    #     print (data)

    #     updates.update(data)

    #     print (updates)

    #     connection.connect()
    #     connection.request('PUT', '/1/users/'+updates['objectId'], json.dumps(updates),
    #     {
    #         "X-Parse-Application-Id": PARSEappID,
    #         "X-Parse-REST-API-Key": RESTapiKEY,
    #         "X-Parse-Session-Token": sessionToken,
    #         "Content-Type": "application/json"
    #     })

    #     response = json.loads(connection.getresponse().read().decode('utf-8'))

    #     if 'error' in response.keys():
    #         print ('error updating the user profile')
    #         return jsonify({ 'error': "Your profile information could not be saved. Please refresh the page and try again." })

    #     else:
    #         return jsonify({ 'success': "Your profile has been saved. You will now be redirected to the dashboard." })


def review(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'review'

    return render(request, 'pages/dashboard.html', 
        {
            'data': PAGEDATA,
        })


def articles(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'articles'

    return render(request, 'pages/dashboard.html', 
        {
            'data': PAGEDATA,
        })


def myarticles(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'dashboard'

    return render(request, 'pages/dashboard.html', 
        {
            'data': PAGEDATA,
        })


# --------------------------------------------------------------------
# POST METHODS
# --------------------------------------------------------------------
# def uploads():
#     AWS_ACCESS_KEY = 'AKIAI63JCRPQ24S2ELUQ'
#     AWS_SECRET_KEY = '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'
#     S3_BUCKET = 'empire-images'

#     object_name = request.args.get('s3_object_name')
#     mime_type = request.args.get('s3_object_type')

#     expires = long(time.time()+10)
#     amz_headers = "x-amz-acl:public-read"

#     put_request = "PUT\n\n%s\n%d\n%s\n/%s/%s" % (mime_type, expires, amz_headers, S3_BUCKET, object_name)

#     signature = base64.encodestring(hmac.new(AWS_SECRET_KEY, put_request, sha1).digest())
#     signature = urllib.quote_plus(signature.strip())

#     url = 'http://%s.s3.amazonaws.com/%s' % (S3_BUCKET, object_name)

#     cdn = 'http://media.empire.life/%s' % (object_name)

#     return json.dumps({
#         'signed_request': '%s?AWSAccessKeyId=%s&Expires=%d&Signature=%s' % (url, AWS_ACCESS_KEY, expires, signature),
#         'url': cdn
#     }) 


# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
