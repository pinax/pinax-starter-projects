{% if django_version < "2" %}from django.conf.urls import url{% endif %}
{% if django_version >= "2" %}from django.urls import path{% endif %}


urlpatterns = [{% if django_version >= "2" %}
    path("<str:path>", "{{ project_name }}.views.static_view"),
{% else %}
    url(r"^(.*)$", "{{ project_name }}.views.static_view"),
{% endif %}]
