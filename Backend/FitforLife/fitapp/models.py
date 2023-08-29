from mongoengine import Document, StringField, IntField
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

class User(Document):
    username = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    gender = StringField()
    age = IntField()
    location = StringField()
    profile_image = StringField()
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
