import django

django.setup()

from app import seeder


if __name__ == "__main__":
    seeder.runAdmin()
