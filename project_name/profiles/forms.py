import re

from django import forms

from .models import Profile


class ProfileForm(forms.ModelForm):

    class Meta:
        model = Profile
        fields = [
            "name",
            "avatar",
            "bio",
            "affiliation",
            "location",
            "website",
            "twitter_username",
        ]

    def clean_twitter_username(self):
        value = self.cleaned_data["twitter_username"]
        value = value.strip()
        if not value:
            return value
        if value.startswith("@"):
            value = value[1:]
        m = re.match(r"^[a-zA-Z0-9_]{1,20}$", value)
        if not m:
            raise forms.ValidationError("invalid Twitter username")
        return value
