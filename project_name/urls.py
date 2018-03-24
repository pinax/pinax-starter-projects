from django.conf import settings
{% if django_version < "2" %}from django.conf.urls import include, url{% endif %}
from django.conf.urls.static import static
from django.contrib import admin
{% if django_version >= "2" %}from django.urls import include, path{% endif %}


urlpatterns = [{% if django_version >= "2" %}
    path("", include("pinax.blog.urls", namespace="pinax_blog")),
    path("admin/", admin.site.urls),
{% else %}
    url(r"^$", include("pinax.blog.urls", namespace="pinax_blog")),
    url(r"^admin/", admin.site.urls),
{% endif %}]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
