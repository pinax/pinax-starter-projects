from django.shortcuts import render


def static_view(request, path):
    """
    serve pages directly from the templates directories.
    """
    if not path or path.endswith("/"):
        template_name = path + "homepage.html"
    else:
        template_name = path
    return render(request, template_name)
