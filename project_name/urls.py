from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.views.generic import TemplateView

from django.contrib import admin

from .styleguides import StyleGuideView
from .views import home


urlpatterns = [
    path("", TemplateView.as_view(template_name="homepage.html"), name="home"),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
    path("documents/", include("pinax.documents.urls", namespace="pinax_documents")),

    path("style-guide/", StyleGuideView.as_view(), name="style-guide")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
