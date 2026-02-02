from django.shortcuts import render


def home(request):
    return render(request, "landing/home.html")


def about(request):
    return render(request, "landing/about.html")


def hosteria(request):
    return render(request, "landing/hosteria.html")


def restaurant(request):
    return render(request, "landing/restaurant.html")


def excursions(request):
    return render(request, "landing/excursions.html")


def contact(request):
    return render(request, "landing/contact.html")
