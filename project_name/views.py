from django.shortcuts import redirect, render


def home(request):
    if request.user.is_authenticated():
        return redirect("documents_index")
    return render(request, "homepage.html")
