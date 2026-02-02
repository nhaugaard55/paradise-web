from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(label="Nombre", max_length=120)
    email = forms.EmailField(label="Email")
    message = forms.CharField(label="Mensaje", widget=forms.Textarea)
