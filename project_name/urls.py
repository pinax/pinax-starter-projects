from django.conf.urls import url, include
from django.views.generic import TemplateView


urlpatterns = [
    url(r"^$", TemplateView.as_view(template_name="pinax/waitinglist/list_signup.html"), name="home"),
    url(r"^waitinglist/", include("pinax.waitinglist.urls", namespace="pinax_waitinglist")),
]
