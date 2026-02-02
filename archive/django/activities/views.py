from django.views.generic import DetailView, ListView

from .models import Activity


class ActivityListView(ListView):
    model = Activity
    template_name = "activities/activity_list.html"
    context_object_name = "activities"

    def get_queryset(self):
        queryset = Activity.objects.all()
        category = self.request.GET.get("category")
        valid_categories = dict(Activity.Category.choices)
        if category in valid_categories:
            queryset = queryset.filter(category=category)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["active_category"] = self.request.GET.get("category", "")
        return context


class ActivityDetailView(DetailView):
    model = Activity
    template_name = "activities/activity_detail.html"
    context_object_name = "activity"
