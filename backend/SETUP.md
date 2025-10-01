## Backend Setup
cd backend
# create a virtual environment - Only Once
python -m venv venv
# or venv\Scripts\activate on Windows
# activate virtual environment
source venv/bin/activate
pip install -r requirements.txt
# cd into where manage.py file exists
cd tracker 
python manage.py migrate
python manage.py runserver


# how to create an admin user
python manage.py createsuperuser
# log in http://127.0.0.1:8000/admin/