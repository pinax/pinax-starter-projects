from django.utils import timezone
from django.views.generic import TemplateView


class MockObject(object):
    def __init__(self, **kwargs):
        for key in kwargs:
            setattr(self, key, kwargs[key])


class StyleGuideView(TemplateView):
    template_name = "style-guide.html"

    def get_context_data(self, *args, **kwargs):
        context = super(StyleGuideView, self).get_context_data(*args, **kwargs)
        paltman = MockObject(username="paltman")
        now = timezone.now()
        folder = MockObject(id=1, name="Sales Documents", icon="folder_open", author=paltman, created=now, modified=now, modified_by=paltman, can_share=lambda u: True)
        context.update({
            "style_guide": {
                "member_table": {
                    "members": [
                        MockObject(id=1, size=6000, name="Sales Leads.xlsx", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=3000, name="Sales Proposal.docx", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=9400, name="Presentation.pptx", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=1080, name="tasks.txt", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=500, name="Wireframes.psd", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=600000, name="screenshots.zip", icon="file", folder=folder, author=paltman, created=now, modified=now, modified_by=paltman),
                        MockObject(id=1, size=2400000, name="Closed Proposals", icon="folder-open", parent=folder, author=paltman, created=now, modified=now, modified_by=paltman, can_share=lambda u: True)
                    ],
                    "folder": folder
                }
            }
        })
        return context
