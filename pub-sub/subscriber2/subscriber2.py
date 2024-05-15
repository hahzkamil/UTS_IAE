import pika

def callback(ch, method, properties, body):
    print("Received message: %r from queue: %r" % (body, method.routing_key))

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq')
)
channel = connection.channel()

queue_name = 'python'
channel.queue_declare(queue=queue_name, durable=True)

channel.basic_consume(
    queue=queue_name, 
    on_message_callback=callback, 
    auto_ack=True
)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
    