from django.shortcuts import redirect, render


def home(request):
    if request.user.is_authenticated():
        return redirect("pinax_documents:document_index")
    return render(request, "homepage.html")
