# backend/Dockerfile

# Use Python base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY ../requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project files
COPY . /app/

# Install Gunicorn
RUN pip install gunicorn

# Copy Gunicorn configuration
COPY gunicorn.conf.py /app/

# Expose port 8000
EXPOSE 8000

# Command to run Gunicorn
CMD ["gunicorn", "--config", "gunicorn.conf.py", "webservice.wsgi:application"]
