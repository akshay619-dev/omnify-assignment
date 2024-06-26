# backend/Dockerfile

# Use Python base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_ALLOWED_HOSTS localhost,127.0.0.1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project files
COPY . /app/

# Install Gunicorn
RUN pip install gunicorn

# Copy Gunicorn configuration
COPY gunicorn.conf.py /app/

# Set environment variables for Django superuser creation
ENV DJANGO_SUPERUSER_USERNAME admin
ENV DJANGO_SUPERUSER_EMAIL admin@example.com
ENV DJANGO_SUPERUSER_PASSWORD admin

# Expose port 8000
EXPOSE 8000

# Run migrations and create superuser
RUN python manage.py migrate
RUN python manage.py createsuperuser --noinput

# Command to run Gunicorn
CMD ["gunicorn", "--config", "gunicorn.conf.py", "webservice.wsgi:application"]
