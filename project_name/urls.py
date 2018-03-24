{% if django_version < "2" %}from django.conf.urls import include, url{% endif %}
from django.contrib import admin
{% if django_version >= "2" %}from django.urls import include, path{% endif %}
from django.views.generic import TemplateView


urlpatterns = [{% if django_version >= "2" %}
    path("", TemplateView.as_view(template_name="pinax/waitinglist/list_signup.html"), name="home"),
    path("admin/", admin.site.urls),
    path("waitinglist/", include("pinax.waitinglist.urls", namespace="pinax_waitinglist")),
{% else %}
    url(r"^$", TemplateView.as_view(template_name="pinax/waitinglist/list_signup.html"), name="home"),
    url(r"^admin/", admin.site.urls),
    url(r"^waitinglist/", include("pinax.waitinglist.urls", namespace="pinax_waitinglist")),
{% endif %}]
