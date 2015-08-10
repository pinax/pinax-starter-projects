from django.contrib import admin

from .models import Profile


admin.site.register(
    Profile,
    list_display=[
        "user",
        "name",
        "avatar",
        "affiliation",
        "location",
        "website",
        "twitter_username",
        "created_at",
    ],
    list_filter=[
        "created_at",
    ],
    search_fields=[
        "user__username",
        "user__email",
        "name",
        "location",
        "website",
        "twitter_username",
    ]
)
