{% if django_version >= "2" %}from django.urls import path{% else %}from django.conf.urls import url{% endif %}
from django.views.generic import TemplateView


urlpatterns = [{% if django_version >= "2" %}
    path("", TemplateView.as_view(template_name="homepage.html"), name="home"),
{% else %}
    url(r"^$", TemplateView.as_view(template_name="homepage.html"), name="home"),
{% endif %}]
