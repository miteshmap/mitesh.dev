---
title: "Django: Set path for global static files"
path: "/django-set-path-global-static-files"
date: "2018-07-25"
author: "Mitesh Patel"
excerpt: "In Django all your custom js/css/images are placed in /static/ directory of your module, But global file should be placed in your application, Django is not supplied with already created / configured global static path. you have to configure it manually."
tags: ["python", "django"]
references: ["https://docs.djangoproject.com/en/dev/howto/static-files/"]
---

In Django all your custom js/css/images are placed in /static/ directory of your module, But global file should be placed in your application, Django is not supplied with already created / configured global static path. you have to configure it manually.

To configure it, we use "os" package to mange directory creations, Which is already imported in your settings.py as

`import os`

- Go to settings.py of your project application
- set `STATIC_ROOT = os.path.join(BASE_DIR, "static")`
- And run django command `python manage.py collectstatic`
- These will place your all modules/plugins static files into root static folder inside application folder.

STATIC_URL is independent of the name, it will create a kind of alias for your static path. so, optionally you can set it any thing else. like

`STATIC_URL = '/assets/'`
