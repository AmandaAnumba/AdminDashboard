# Admin Dashboard

dashboard for a blog, built with Django and AngularJS

### Link
https://admin-blog.herokuapp.com/

### How to Use

To use this project, follow these steps:

1. Create your sandbox environment (see below for Virtual Environment setup)
2. Install Django (`$ pip install django`)
3. Create a new project using this template

### Virtual Environment setup
To set up a new virtual environment with python3 on mac
```bash
    $ virtualenv -p python3 <environment name>
```

Activate the new virtual environment on mac
```bash
    $ source _macEnv/bin/activate
```

### Creating Your Project

Using this template to create a new Django app is easy:
```bash
    $ django-admin.py startproject --template=https://github.com/heroku/heroku-django-template/archive/master.zip --name=Procfile helloworld
```

You can replace `helloworld` with your desired project name.

### Deployment to GitHub (automatically to Heroku with Automatic Deploys)
```bash
    $ git init
    $ git add --all
    $ git commit -am <commit message>
    $ git push origin master
```

### To Deploy to Heroku
```bash
    $ heroku create
    $ git push heroku master
    $ heroku run python manage.py migrate
```

### Tools Used
- Python and Django
- Heroku for deployment
- Semantic UI (including avatars) : http://semantic-ui.com/
- uikit : https://getuikit.com/index.html
- Amazon RDS for MySQL database
- mmenu : http://mmenu.frebsite.nl/
- IcoMoon : https://icomoon.io/
- jquery-hmbrgr.js : https://github.com/MorenoDiDomenico/jquery-hmbrgr
- jQuery-tagEditor : https://github.com/Pixabay/jQuery-tagEditor