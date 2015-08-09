from django.apps import AppConfig as BaseAppConfig


class AppConfig(BaseAppConfig):

    name = "{{ project_name }}"
