from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def localized(context, obj, base_field):
    """
    Returns obj.base_field_{lang} if available, fallback to Spanish.
    """
    lang = getattr(context.request, "LANGUAGE_CODE", "es")
    preferred = f"{base_field}_{lang}"
    fallback = f"{base_field}_es"
    return getattr(obj, preferred, "") or getattr(obj, fallback, "")
