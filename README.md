# pinax-project

[![Join us on Slack](http://slack.pinaxproject.com/badge.svg)](http://slack.pinaxproject.com/)

Pinax is a collection of Django project templates that we call starter projects
as well as apps and themes. Many of the starter projects are derivatives of each
other ([pinax-project-zero](http://github.com/pinax/pinax-project-zero) is a
parent of [pinax-project-project](http://github.com/pinax/pinax-project-project)
among many others).

One of the things that has become a bit of a maintenance nightmare, especially
as we add additional projects is keepign all these repos up to date with when
most of the changes apply to all of them (e.g. upgrade Django version).

This repo serves as an experiment as a new way of managing this.

We will leverage `git` and branching to manage the hierarchy.  The `master`
branch will remain purely for this README and perhaps other ancillary files.
Each project template will get a new branch and will branch from it's natural
parent. This README will be maintained with a full list of the branches and
thus the starter projects in this repo. We may at some point add remotes to
push each branch to it's own repo where the code will live at master, but that
will be treated purely as mirrors of this repo.

#### Getting Started

All starter projects share a common method for getting started. It involves
created a virtualenv, installing Django, and running the `startproject` command
with a url to the template, followed by a few commands within your new project.

```
pip install virtualenv
virtualenv mysiteenv
source mysiteenv/bin/activate
pip install Django==1.8.3
django-admin.py startproject --template=https://github.com/pinax/pinax-project/zipball/<PROJECT_BRANCH> mysite --extension=py,js
cd mysite
chmod +x manage.py
pip install -r requirements.txt
./manage.py migrate
./manage.py loaddata sites
./manage.py runserver
```

See each section below for the startproject url as well as any deviation from
these common notes.


#### Projects

* `zero`
 * `account`
 * `blog`
* `social`
* `social-auth`
* `lms`
* `forums`
* `waiting-list`
* `private-beta`
* `wiki`
* `teams`
* `symposion`
* `static`


##### Pinax Project Zero

This project lays the foundation for all other Pinax starter projects. It
provides the project directory layout and bootstrap-based theme.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-project/zipball/zero mysite --extension=py,js
```

##### Pinax Project Account

In addition to what is provided by the "zero" project, this project provides
thorough integration with django-user-accounts, adding comprehensive account
management functionality. It is a foundation suitable for most sites that have
user accounts.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-project/zipball/account mysite --extension=py,js
```

##### Pinax Project Blog

This project gets you off and running with a blog.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-project/zipball/blog mysite --extension=py,js
```

##### Pinax Project Social


##### Pinax Project Social Auth



##### Pinax Project LMS


##### Pinax Project Forums


##### Pinax Project Waiting List


##### Pinax Project Private Beta


##### Pinax Project Wiki


##### Pinax Project Teams


##### Pinax Project Symposion


##### Pinax Project Static
