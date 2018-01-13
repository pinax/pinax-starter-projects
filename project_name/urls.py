from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static

from django.contrib import admin

from .styleguides import StyleGuideView
from .views import home


urlpatterns = [
    path("", home, name="home"),
    path("admin/", include(admin.site.urls)),
    path("account/", include("account.urls")),
    path("documents/", include("pinax.documents.urls", namespace="pinax_documents")),

    path("style-guide/$", StyleGuideView.as_view(), name="style-guide")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
