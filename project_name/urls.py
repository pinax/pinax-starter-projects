from django.conf.urls import patterns, url, include
from django.views.generic import TemplateView


urlpatterns = patterns(
    "",
    url(r"^$", TemplateView.as_view(template_name="homepage.html"), name="home"),
    url(r"^waitinglist/", include("pinax.waitinglist.urls")),
)
