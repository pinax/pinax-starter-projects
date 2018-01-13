from django.urls import path, include
from django.views.generic import TemplateView

from django.contrib import admin


urlpatterns = [
    path("", TemplateView.as_view(template_name="pinax/waitinglist/list_signup.html"), name="home"),
    path("waitinglist/", include("pinax.waitinglist.urls", namespace="pinax_waitinglist")),
    path("admin/", include(admin.site.urls)),
]
