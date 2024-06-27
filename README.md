### Project Name : Omnify Assignment

### Overview

Develop a web service (using Django, reactJS, Gunicorn, and Nginx) that returns a list of users and their friends. 
This web service should Add, Modify, Delete, and View a list of users.

Bonus points if the candidate completes the below two items :

1. There should be two docker-based microservices, one for Frontend and a second for Backend. 
2. Set up a GitHub CI/CD for said code.
3. Communication between the front end and the back end has to happen using APIs protected by Oauth2.




### Folder Structure : 📂


```shell
backend/         # Backend application directory
  |-- Dockerfile     # Dockerfile for backend service
  |-- users/         # Django app for users management
  |-- webservice/    # Django project settings and configurations
  |-- manage.py      # Django management script
  |-- gunicorn.conf.py # gunicorn config file
  |-- requirements.txt # Python dependencies

frontend/        # Frontend application directory
  |-- Dockerfile     # Dockerfile for frontend service
  |-- public/        # Public assets
  |-- src/           # Source code
  |-- package.json   # Node.js dependencies
  |-- nginx.conf     # Nginx configuration 

docker-compose.yml    # Docker Compose configuration file
nginx.conf            # Nginx configuration file for frontend

.github/          # GitHub Actions workflow directory
  |-- workflows/
      |-- docker-compose.yml    # GitHub Actions CI/CD workflow

README.md         # This file

```

### Setup Instructions

### Prerequisites
Docker and Docker Compose installed locally
Node.js and npm (for frontend development)

### Backend Setup

Clone the repository:

```shell
git clone https://github.com/akshay619-dev/omnify-assignment.git
cd omnify-assignment
```

Build and run the Docker container:

```shell
docker-compose up --build -d
```

### Check Django Admin Access

```shell
docker-compose exec backend python manage.py createsuperuser
```

### Restart Services: Restart the Docker services to apply any changes:

```shell
docker-compose down
docker-compose up --build -d 
```

### OR Setup manually

```shell
cd backend
pip install -r requirements.txt
```
### Run the application 
```shell
python manage.py runserver
```

### Or Run via Gunicorn

```shell
gunicorn --bind 0.0.0.0:8080 webservice.wsgi:application
```


### Access the backend API at http://localhost:8000.

### Frontend Setup

Navigate to the frontend directory:

```shell
cd ../frontend
```
## Install dependencies:

```shell
npm install
```
## Run Frontend as dev environemt

```shell
npm run dev
```

### Access the frontend at http://localhost:5173.

## Build the frontend application:

```shell
npm run build
```




