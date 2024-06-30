FROM python:3.10.13
ENV PYTHONUNBUFFERED=1
WORKDIR /djangoAPI
COPY . /djangoAPI/
RUN pip install --upgrade pip wheel setuptools requests
RUN pip install -r requirements.txt
EXPOSE 8000
