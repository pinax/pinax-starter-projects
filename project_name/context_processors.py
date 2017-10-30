from django.contrib.sites.models import Site
from django.conf import settings as django_settings


def settings(request):
    ctx = {
        "ADMIN_URL": django_settings.ADMIN_URL,
        "CONTACT_EMAIL": django_settings.CONTACT_EMAIL,
    }

    if Site._meta.installed:
        site = Site.objects.get_current(request)
        ctx.update({
            "SITE_NAME": site.name,
            "SITE_DOMAIN": site.domain
        })

    return ctx
