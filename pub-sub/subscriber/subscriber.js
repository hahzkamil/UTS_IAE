const express = require("express");
const app = express();
const port = 3000;
const amqp = require("amqplib/callback_api");

// Conecct
amqp.connect("amqp://rabbitmq", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    var queue = "sms";

    channel.assertExchange('sebariin', 'fanout', {
      durable: true
    });

    channel.assertQueue(queue, { durable: true });

    channel.consume(
      queue,
      (message) => {
        console.log(
          `Message [${message.content.toString()}] received froms queue [${queue}]`
        );
      },
      { noAck: true }
    );
    // console.log(`Message [${message}] sent to queue [${queue}]`);
  });
});

app.listen(port, () => {
  console.log(`Subscriber listening at http://172.18.0.10:${port}`);
});
