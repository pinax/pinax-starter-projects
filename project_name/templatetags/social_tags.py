from django import template


register = template.Library()


@register.assignment_tag
def user_can_disconnect(user_social_auth):
    return user_social_auth.allowed_to_disconnect(user_social_auth.user, user_social_auth.provider)
