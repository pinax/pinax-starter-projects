from wiki.hooks import WikiDefaultHookset


class ProjectWikiHookset(WikiDefaultHookset):

    def _perm_check(self, wiki, user):
        return user.is_authenticated()

    def can_create_page(self, wiki, user):
        return self._perm_check(wiki, user)

    def can_edit_page(self, page, user):
        return self._perm_check(page.wiki, user)

    def can_delete_page(self, page, user):
        return self._perm_check(page.wiki, user)

    def can_view_page(self, page, user):
        return True
