FROM python

WORKDIR /app

COPY . /app

RUN pip install pika

EXPOSE 80

CMD [ "python", "subscriber2.py" ]