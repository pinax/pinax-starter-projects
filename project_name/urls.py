from django.conf.urls import url, include
from django.views.generic import TemplateView

from django.contrib import admin


urlpatterns = [
    url(r"^$", TemplateView.as_view(template_name="pinax/waitinglist/list_signup.html"), name="home"),
    url(r"^waitinglist/", include("pinax.waitinglist.urls", namespace="pinax_waitinglist")),
    url(r"^admin/", include(admin.site.urls)),
]
