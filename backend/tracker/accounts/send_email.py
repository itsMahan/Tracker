from django.core.mail import send_mail
import random
from django.conf import settings
from .models import CustomUser


def send_otp_via_email(email):
    subject = 'Your Tracker App Verification Code'
    otp_code = random.randint(1000,9999)
    message = f'Your Verification Code is {otp_code}'
    email_from = settings.EMAIL_HOST
    send_mail(subject, message, email_from, [email])
    user = CustomUser.objects.get(email=email)
    user.otp = otp_code
    user.save()