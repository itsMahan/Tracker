## Backend Setup
cd backend
python -m venv venv
# or venv\Scripts\activate on Windows
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
