from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

from accounts.models import User


class AuthForm(AuthenticationForm):

    def confirm_login_allowed(self, user):
        if not user.is_active:
            raise forms.ValidationError(
                'There was a problem with your login.', code='invalid_login')


class UserRegisterForm(UserCreationForm):
    role = forms.IntegerField()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password1',
                  'password2', 'role')

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
