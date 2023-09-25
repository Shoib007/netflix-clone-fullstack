from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self,email, password, **extrafields):
        if not email:
            raise ValueError('Please provide an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extrafields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('is_superuser',True)
        extrafields.setdefault('is_active', True)

        if extrafields.get('is_staff') is not True:
            raise ValueError('Superusers should be a staff member')
        if extrafields.get('is_superuser') is not True:
            raise ValueError('Superusers should be true')
        
        return self.create_user(email, password, **extrafields)
    