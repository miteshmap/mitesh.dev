---
title: "Django: class based views"
path: "/django-class-based-views"
date: "2018-07-27"
author: "Mitesh Patel"
excerpt: "In Django views used to be defined as function, which accepts the request argument and return HttpResponse. Well that is a very easy approach to implement a view for any given path. while there are other drawbacks of using this approach, like:"
tags: ["python", "django"]
references:
  ["https://docs.djangoproject.com/en/2.0/topics/class-based-views/intro/"]
---

In Django views used to be defined as function, which accepts the request argument and return HttpResponse. Well that is a very easy approach to implement a view for any given path. while there are other drawbacks of using this approach, like:

1. You have to deal with your logic in a single function for a page when you are rendering form. to return empty form, handler post requests, validation etc..
2. You have to use a login written in a views, you have to write the same login again for different view function or create a function and use it. (Which could again be messy at time)
3. To many conditions and to many repetition of same logic again and again.
4. you can not extend it.

Here's how a function based views look:

```python
from django.shortcuts import render, HttpResponse, redirect
from accounts.forms import RegistrationFrom

def register(request):
    """
    Register: functional way of handling register view.
    """
    if request.method == 'POST':
        form = RegistrationFrom(request.POST)
        if (form.is_valid()):
            form.save()
            redirect('/account/login')
    else:
        form = RegistrationFrom()

    return render(request, 'accounts/register.html', {'form': form})
```

and urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name="register"),
]
```

To overcome all this functional drawbacks you can choose class-based approach of writing views. In class-based approach you can avoid nesting of if conditions, by having a separate method for each HTTP method i.e. (get, post, put, patch, delete etc..) this will make your code looks clean and readable.

You can use benefits of python like generators, effectively implement DRY method of programming and can also extend existing views class for modifications. There's a very minor change that you have to do in your exiting urls.py and views.py. Let's see how it looks after modifications.

views.py

```python
from django.shortcuts import render, HttpResponse, redirect
from accounts.forms import RegistrationFrom
from django.views import View

class AccountRegister(View):
    """
    Register: class based way of handling register view.
    """
    template_name = 'accounts/register.html'
    from_class = RegistrationFrom
    def get(self, request):
        return render(request, self.template_name, {'form': self.from_class()})

    def post(self, request):
        form = self.from_class(request.POST)
        if (form.is_valid()):
            form.save()
            redirect('/account/login')
        return render(request, self.template_name, {'form': form})
```

and urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.AccountRegister.as_view(), name="register"),
]
```

Let's improve a big this urls.py

```python
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', AccountRegister.as_view(), name="register"),
]
```

In general terms, django url patterns accepts views in a specific way, so that it can pass arguments in a callable function. that's why we have to convert our class in a views acceptable object, that's why we have to use `as_view()` Of course there's a lot procedure going on behind the scene, you can see the details and more use cases here: [https://docs.djangoproject.com/en/2.0/topics/class-based-views/intro/](https://docs.djangoproject.com/en/2.0/topics/class-based-views/intro/)
