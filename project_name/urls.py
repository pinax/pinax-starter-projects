from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from django.contrib import admin

from .views import homepage
from .profiles.views import ProfileDetailView, ProfileEditView, ProfileListView


urlpatterns = patterns(
    "",
    url(r"^$", homepage, name="home"),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^account/", include("account.urls")),
    url(r"^invites/", include("kaleo.urls")),

    url(r"^profile/edit/", ProfileEditView.as_view(), name="profiles_edit"),
    url(r"^u/$", ProfileListView.as_view(), name="profiles_list"),

    url(r"^u/(?P<username>[\w\._-]+)/$", ProfileDetailView.as_view(), name="profiles_detail"),
    url(r"^t/", include("teams.urls")),

    url(r"", include("wiki.urls"))
)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
