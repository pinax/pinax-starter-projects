# {{ project_name }}

## Getting Started

Make sure you are using a virtual environment of some sort (e.g. `virtualenv` or
`pyenv`).

```
pipenv install
pipenv shell
nodeenv --prebuilt --python-virtualenv --node=10.18.1
npm install
./manage.py migrate
./manage.py loaddata sites
```

Then, in two different terminals:

```
npm start
./manage.py runserver
```

Browse to http://localhost:8000/
