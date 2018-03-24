from django.conf import settings
{% if django_version < "2" %}from django.conf.urls import include, url{% endif %}
from django.conf.urls.static import static
from django.contrib import admin
{% if django_version >= "2" %}from django.urls import include, path{% endif %}
from django.views.generic import TemplateView

from .styleguides import StyleGuideView


urlpatterns = [{% if django_version >= "2" %}
    path("", TemplateView.as_view(template_name="homepage.html"), name="home"),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
    path("documents/", include("pinax.documents.urls", namespace="pinax_documents")),
    path("style-guide/", StyleGuideView.as_view(), name="style-guide"),
{% else %}
    url(r"^$", TemplateView.as_view(template_name="homepage.html"), name="home"),
    url(r"^admin/", admin.site.urls),
    url(r"^account/", include("account.urls")),
    url(r"^documents/", include("pinax.documents.urls", namespace="pinax_documents")),
    url(r"^style-guide/", StyleGuideView.as_view(), name="style-guide"),
{% endif %}]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
