# {{ project_name }}

## Getting Started

Make sure you are using a virtual environment of some sort (e.g. `virtualenv` or
`pyenv`).

There are packages in use that require PostgresSQL, namely `pinax-eventlog`.

Create your database:

```
createdb {{ project_name }}
```

Then run the following:

```
pipenv install
pipenv shell
nodeenv --prebuilt --python-virtualenv --node=12.16.1
exit
pipenv shell
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
