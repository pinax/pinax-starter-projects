from django.core.urlresolvers import reverse

from django.contrib.auth.models import User

from teams.models import Team
from wiki.binders import Binder


class UserBinder(Binder):

    bind_to_model = User
    slug_name = "username"

    @property
    def root(self):
        return r"^u/(?P<username>[\w\._-]+)/w/"

    def page_url(self, wiki, slug):
        user = wiki.content_type.get_object_for_this_type(pk=wiki.object_id)
        return reverse(self.page_url_name, kwargs={"slug": slug, "username": user.username})

    def edit_url(self, wiki, slug):
        user = wiki.content_type.get_object_for_this_type(pk=wiki.object_id)
        return reverse(self.edit_url_name, kwargs={"slug": slug, "username": user.username})


class TeamBinder(Binder):

    bind_to_model = Team
    slug_name = "slug"

    def get_object(self, **kwargs):
        return self.bind_to_model._default_manager.get(**{
            self.slug_name: kwargs.get("team_slug")
        })

    @property
    def root(self):
        return r"^t/(?P<team_slug>[\w\-]+)/w/"

    def page_url(self, wiki, slug):
        team = wiki.content_type.get_object_for_this_type(pk=wiki.object_id)
        return reverse(self.page_url_name, kwargs={"slug": slug, "team_slug": team.slug})

    def edit_url(self, wiki, slug):
        team = wiki.content_type.get_object_for_this_type(pk=wiki.object_id)
        return reverse(self.edit_url_name, kwargs={"slug": slug, "team_slug": team.slug})
