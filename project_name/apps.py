from importlib import import_module

from django.apps import AppConfig as BaseAppConfig


class AppConfig(BaseAppConfig):

    name = "{{ project_name }}"

    def ready(self):
        import_module("{{ project_name }}.receivers")
        import_module("{{ project_name }}.profiles.receivers")
        import_module("pinax.wiki.receivers")  # @@@ upgrade pinax-wiki to load in it's own apps.py
