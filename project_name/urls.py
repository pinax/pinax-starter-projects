from django.conf.urls import patterns, url


urlpatterns = patterns("",
    url(r"^(.*)$", "{{ project_name }}.views.static_view"),
)
