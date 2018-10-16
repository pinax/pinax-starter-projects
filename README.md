# {{ project_name }}

## Getting Started

Make sure you are using a virtual environment of some sort (e.g. `virtualenv` or
`pyenv`).

```
npm install
pipenv install
pipenv shell
./manage.py migrate
./manage.py loaddata sites
```

Then, in two different terminals:

```
npm start
./manage.py runserver
```

Browse to http://localhost:8000/
