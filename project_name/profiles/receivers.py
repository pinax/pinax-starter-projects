from django.dispatch import receiver

from django.db.models.signals import post_save

from django.contrib.auth.models import User

from .models import Profile


@receiver(post_save, sender=User)
def handle_user_save(sender, created, instance, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)
