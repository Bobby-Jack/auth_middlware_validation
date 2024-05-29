from django_seed import Seed

from .models import *
from django.contrib.auth.hashers import make_password # pour hacher un mdp (obligatoire avant de l e stocker dans la db)

import datetime

def runRole():
    seeder = Seed.seeder()

    roles = [
        {"name": "user"},
        {"name": "admin"},
        {"name": "ban"},
    ]

    for r in roles:
        seeder.add_entity(Role, 1, r)

    pks = seeder.execute()
    print(pks)

    
def runAdmin():
    seeder = Seed.seeder()
    psw = make_password('admin')

    seeder.add_entity(User,1,
    {
        'username': "admin",
        "email" : "dummy@gmail.com",
        "password" : psw,
        "role_id" : 2,
        "last_login": None
        
    }                  
    )

    pks = seeder.execute()
    print(pks)

