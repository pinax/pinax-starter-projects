from wiki.hooks import WikiDefaultHookset


class ProjectWikiHookset(WikiDefaultHookset):

    def _perm_check(self, wiki, user):
        if wiki.content_type.model == "user":
            return wiki.content_object == user
        elif wiki.content_type.model == "team":
            return wiki.content_object.is_on_team(user)
        return False

    def can_create_page(self, wiki, user):
        return self._perm_check(wiki, user)

    def can_edit_page(self, page, user):
        return self._perm_check(page.wiki, user)

    def can_delete_page(self, page, user):
        return self._perm_check(page.wiki, user)

    def can_view_page(self, page, user):
        return True
