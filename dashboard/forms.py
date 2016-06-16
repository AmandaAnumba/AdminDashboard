from django import forms

from .models import Member

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ('user', 'avatar', 'bio', 'linkedin', 'pinterest', 'facebook', 'instagram', 'twitter', 'tumblr', 'website')