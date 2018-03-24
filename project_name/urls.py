from django.conf import settings
{% if django_version < "2" %}from django.conf.urls import include, url{% endif %}
from django.conf.urls.static import static
from django.contrib import admin
{% if django_version >= "2" %}from django.urls import include, path{% endif %}

from .views import homepage
from .profiles.views import ProfileDetailView, ProfileEditView, ProfileListView


urlpatterns = [{% if django_version >= "2" %}
    path("", homepage, name="home"),
    path("admin/", admin.site.urls),
    path("account/", include("account.urls")),
    path("invites/", include("pinax.invitations.urls")),

    path("profile/edit/", ProfileEditView.as_view(), name="profiles_edit"),
    path("u/$", ProfileListView.as_view(), name="profiles_list"),
    path("u/(?P<username>[\w\._-]+)/$", ProfileDetailView.as_view(), name="profiles_detail"),
    path("t/", include("pinax.teams.urls", namespace="pinax_teams")),
    path("wiki/", include("pinax.wiki.urls", namespace="pinax_wiki")),
{% else %}
    url(r"^$", homepage, name="home"),
    url(r"^admin/", admin.site.urls),
    url(r"^account/", include("account.urls")),
    url(r"^invites/", include("pinax.invitations.urls")),

    url(r"^profile/edit/", ProfileEditView.as_view(), name="profiles_edit"),
    url(r"^u/$", ProfileListView.as_view(), name="profiles_list"),
    url(r"^u/(?P<username>[\w\._-]+)/$", ProfileDetailView.as_view(), name="profiles_detail"),
    url(r"^t/", include("pinax.teams.urls", namespace="pinax_teams")),
    url(r"^wiki/", include("pinax.wiki.urls", namespace="pinax_wiki")),
{% endif %}]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
