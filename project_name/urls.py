from django.conf import settings
{% if django_version < "2" %}from django.conf.urls import include, url{% endif %}
from django.conf.urls.static import static
{% if django_version >= "2" %}from django.urls import include, path{% endif %}
from django.views.generic import TemplateView

from django.contrib import admin


urlpatterns = [{% if django_version >= "2" %}
    path("", TemplateView.as_view(template_name="homepage.html"), name="home"),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
{% else %}
    url(r"^$", TemplateView.as_view(template_name="homepage.html"), name="home"),
    url(r"^admin/", admin.site.urls),
    url(r"^account/", include("account.urls")),
{% endif %}]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
