from django.core.urlresolvers import reverse
from django.views.generic import UpdateView, DetailView, ListView

from django.contrib import messages

from account.mixins import LoginRequiredMixin

from .forms import ProfileForm
from .models import Profile


class ProfileEditView(LoginRequiredMixin, UpdateView):

    form_class = ProfileForm
    model = Profile

    def get_object(self):
        return self.request.user.profile

    def get_success_url(self):
        return reverse("profiles_list")

    def form_valid(self, form):
        response = super(ProfileEditView, self).form_valid(form)
        messages.success(self.request, "You successfully updated your profile.")
        return response


class ProfileDetailView(DetailView):

    model = Profile
    slug_url_kwarg = "username"
    slug_field = "user__username"
    context_object_name = "profile"


class ProfileListView(ListView):

    model = Profile
    context_object_name = "profiles"
