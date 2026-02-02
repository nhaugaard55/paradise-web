from activities.models import Activity
from core.models import SiteSettings


def site_settings(request):
    return {
        "site_settings": SiteSettings.objects.first()
    }


def activity_categories(request):
    return {
        "activity_categories": Activity.Category.choices
    }
