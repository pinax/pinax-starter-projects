# Pinax Starter Projects

[![Join us on Slack](http://slack.pinaxproject.com/badge.svg)](http://slack.pinaxproject.com/)


Pinax
--------

Pinax is a collection of Django project templates that we call starter projects
as well as apps and themes. This collection can be found at http://pinaxproject.com.


pinax-starter-projects
-------------------------

Many of the starter projects are derivatives of each
other ([pinax-starter-projects-zero](http://github.com/pinax/pinax-starter-projects-zero) is a
parent of [pinax-starter-projects-project](http://github.com/pinax/pinax-starter-projects-project)
among many others).

One of the things that has become a bit of a maintenance nightmare, especially
as we add additional projects is keeping all these repos up to date with when
most of the changes apply to all of them (e.g. upgrade Django version).

This repo serves as an experiment as a new way of managing this.

We will leverage `git` and branching to manage the hierarchy.  The `master`
branch will remain purely for this README and perhaps other ancillary files.
Each project template will get a new branch and will branch from it's natural
parent. This README will be maintained with a full list of the branches and
thus the starter projects in this repo. We may at some point add remotes to
push each branch to it's own repo where the code will live at master, but that
will be treated purely as mirrors of this repo.


Getting Started
----------------

All starter projects share a common method for getting started. It involves
created a virtualenv, installing Django, and running the `startproject` command
with a url to the template, followed by a few commands within your new project.

```
pip install virtualenv
virtualenv mysiteenv
source mysiteenv/bin/activate
pip install Django==1.8.4
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/<PROJECT_BRANCH> mysite -n webpack.config.js
cd mysite
chmod +x manage.py
pip install -r requirements.txt
./manage.py migrate
./manage.py loaddata sites
./manage.py runserver
```

See each section below for the startproject url as well as any deviation from
these common notes.


Projects
----------

* [zero](#pinax-project-zero)
  * [account](#pinax-project-account)
    * [documents](#pinax-project-documents)
    * [wiki](#pinax-project-wiki)
      * [team-wiki](#pinax-project-team-wiki)
  * [blog](#pinax-project-blog)
  * [static](#pinax-project-static)
* `social`
* `social-auth`
* `lms`
* `forums`
* `waiting-list`
* `private-beta`
* `symposion`


##### Pinax Project Zero

This project lays the foundation for all other Pinax starter projects. It
provides the project directory layout and bootstrap-based theme.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/zero mysite -n webpack.config.js
```

##### Pinax Project Account

In addition to what is provided by the "zero" project, this project provides
thorough integration with django-user-accounts, adding comprehensive account
management functionality. It is a foundation suitable for most sites that have
user accounts.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/account mysite -n webpack.config.js
```

##### Pinax Project Blog

This project gets you off and running with a blog.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/blog mysite -n webpack.config.js
```

##### Pinax Project Static

This purpose of this starter project is to provide a robust mocking and design tool.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/static mysite -n webpack.config.js
```

##### Pinax Project Social


##### Pinax Project Social Auth


##### Pinax Project LMS


##### Pinax Project Forums


##### Pinax Project Waiting List


##### Pinax Project Private Beta


##### Pinax Project Documents

Builds on the Accounts starter project to get you off and running with a document
library built around [pinax-documents](https://github.com/pinax/pinax-documents)

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/documents mysite -n webpack.config.js
```

##### Pinax Project Wiki

a demo starter project that provides a wiki for authenticated users

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/wiki mysite -n webpack.config.js
```


##### Pinax Project Team Wiki

a starter project that has account management with profiles and teams and basic collaborative content.

```
django-admin.py startproject --template=https://github.com/pinax/pinax-starter-projects/zipball/team-wiki mysite -n webpack.config.js
```

##### Pinax Project Symposion


Development
---------------

If you want to develop your own starter projects here is the workflow you should
follow:

1. Start with the branch you want to base your new project on.
2. `git co -b <name>`
3. Do the work on your project template
4. Test your project template by running `django-admin.py startproject --template=pinax-starter-projects test1 -n webpack.config.js`
5. Once you are satisified with your testing, commit.
6. `git co master` and then update this `README.md` file with details about your new project
7. Update all descendent branches:

```
(
 git co zero && git merge master --no-edit
 git co account && git merge zero --no-edit
 git co blog && git merge zero --no-edit
 git co static && git merge zero --no-edit
 git co documents && git merge account --no-edit
 git co wiki && git merge account --no-edit
 git co team-wiki && git merge wiki --no-edit
)
git push
```

Documentation
---------------

The Pinax documentation is available at http://pinaxproject.com/pinax/.


Code of Conduct
-----------------

In order to foster a kind, inclusive, and harassment-free community, the Pinax Project has a code of conduct, which can be found here  http://pinaxproject.com/pinax/code_of_conduct/.


Pinax Project Blog and Twitter
--------------------------------

For updates and news regarding the Pinax Project, please follow us on Twitter at [@pinaxproject](https://twitter.com/pinaxproject) and check out our blog http://blog.pinaxproject.com.
