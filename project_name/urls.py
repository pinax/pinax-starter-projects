from django.urls import path


urlpatterns = [
    path("<str:path>", "{{ project_name }}.views.static_view"),
]
