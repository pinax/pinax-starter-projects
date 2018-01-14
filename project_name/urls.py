from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static

from django.contrib import admin

from .views import homepage
from .profiles.views import ProfileDetailView, ProfileEditView, ProfileListView


urlpatterns = [
    path("", homepage, name="home"),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
    path("invites/", include("kaleo.urls")),

    path("profile/edit/", ProfileEditView.as_view(), name="profiles_edit"),
    path("u/$", ProfileListView.as_view(), name="profiles_list"),

    path("u/(?P<username>[\w\._-]+)/$", ProfileDetailView.as_view(), name="profiles_detail"),
    path("t/", include("teams.urls")),

    path("", include("pinax.wiki.urls"))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
