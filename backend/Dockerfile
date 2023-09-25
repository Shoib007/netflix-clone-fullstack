#BASE Image File
FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1
WORKDIR /django
COPY requirement.txt requirement.txt
RUN pip3 install -r requirement.txt
COPY . .