from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect
# from .models import *


# Global Variables
# ------------------
CURRCYCLE = 2
DEBUG = True
VERSION = 'tYc60aWFYF'
V = '2016-04-23-1350'
DATA = {
    'page': '',
    'version': V,
    'hasPageJS': True,
    'hasPageCSS': True,
    'debug': DEBUG,
    'cycle': CURRCYCLE,
    'cycleTitle': 'They Think They Know'
}
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])



def index(request):
    if 'username' in request.session:
        return redirect(dashboard)
    else:
        PAGEDATA = {}
        PAGEDATA.update(DATA)
        PAGEDATA['page'] = 'login'
        return render(request, 'dash/login.html', {'data': PAGEDATA})


@csrf_protect
def userlogin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # username = "Amanda"
        # password = "sweetcandy"
        
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['username'] = username
                # return jsonify({ 'success': "success" })
                return redirect(dashboard)
            else:
                return jsonify({ 'error': "<strong>Error:</strong> Account disabled."})
        else:
            return jsonify({ 'error': "<strong>Error:</strong> Your login information was incorrect. Please try again."})
    else:
        return redirect(index)


# def register(request):
#     if request.method == 'POST':
#         username = request.form.get('username', None)
#         email = request.form.get('email', None).lower()
#         password = request.form.get('password', None)
#         confirm = request.form.get('confirm', None)
        
#         connection.connect()
#         connection.request('POST', '/1/users', json.dumps({
#             "username": username,
#             "password": password,
#             "email": email
#         }), {
#             "X-Parse-Application-Id": PARSEappID,
#             "X-Parse-REST-API-Key": RESTapiKEY,
#             "Content-Type": "application/json"
#         })
        
#         result = json.loads(connection.getresponse().read().decode('utf-8'))

#         if 'error' in result.keys():
#             print("error while registering")
#             print(result)
#             return jsonify({'error': result })

#         else:
#             session['username'] = username
        
#             # stay logged in longer
#             session.permanent = True

#             return jsonify({ 'success': "Registration successful. You are now logged in." })

#     elif request.method == 'GET':
#         return redirect(url_for('index'))


# def forgot(request):
#     if request.method == 'POST':
#         email = request.form.get('email', None).lower()

#         connection.connect()
#         connection.request('POST', '/1/requestPasswordReset', json.dumps({
#             "email": email
#         }), {
#             "X-Parse-Application-Id": PARSEappID,
#             "X-Parse-REST-API-Key": RESTapiKEY,
#             "Content-Type": "application/json"
#         })

#         result = json.loads(connection.getresponse().read().decode('utf-8'))

#         if 'error' in result.keys():
#             print ("error")
#             return jsonify({ 'error': "We cannot find the account associated with this email address. Please enter the email address used to register your account." })

#         else:
#             print ('success')
#             return jsonify({ 'success': "An email has been sent to you. Please follow the link to reset your password." })

#     elif request.method == 'GET':
#         return redirect(url_for('index'))


# def logout(request):
#     # remove the username from the session if it's there
#     try:
#       del request.session['username']
#       del request.session['uID']
#       del request.session['sessionToken']
#     except KeyError:
#       pass
#     return redirect(url_for('index'))


def dashboard(request):
    PAGEDATA = {}
    PAGEDATA.update(DATA)
    PAGEDATA['page'] = 'dashboard'
    return render(request, 'dash/dashboard.html', {'data': PAGEDATA})
    


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
