from django.shortcuts import render


def homepage(request):
    if request.user.is_authenticated():
        return render(request, "dashboard.html")
    else:
        return render(request, "homepage.html")
