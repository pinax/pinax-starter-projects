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


## Stripe Integration

1. Set your keys for your Stripe account in `settings.py`:

    PINAX_STRIPE_SECRET_KEY
    PINAX_STRIPE_PUBLIC_KEY


2. Create one or more plans in your Stripe dashboard.

3. Run:

    ./manage.py sync_plans

## Testing Locally

Since the Stripe integration is driven largely by webhooks you'll need to
configure a port forwarder to give you a public URL to route requests to
your local `runserver`.

[ngrok](https://ngrok.com/) has been a great tool that is easy to get going,
but you can use whatever you want. Here is how to use `ngrok`:

    ngrok http 8000  # assuming you are running runserver with the default 8000 port

Copy and paste the url that ngrok outputs that it's mapping to your local
machine, into your webhook settings in the Stripe dashboard account settings.
Make sure the webhook URL appended to the end:

    http://<random code>.ngrok.io/payments/webhook/

Now when you do activities locally like subscribe, change payment methods, etc.,
the webhooks will flow back to your machine.

