const express = require("express");
const app = express();
const port = 3000;
const amqp = require("amqplib/callback_api");

// Conecct
amqp.connect("amqp://rabbitmq", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    var exchange = "sebariin";
    var message = `hadeh ${Date.now().toLocaleString()}`;

    channel.assertExchange(exchange, 'fanout',{ durable: true });

    setInterval(() => {
      channel.publish(exchange, '', Buffer.from(message));
      console.log(`Message [${message}] sent to exchange [${exchange}] ${Date.now().toLocaleString()}`);
    }, 1500);

    process.on("beforeExit", () => {
      channel.close();
      connection.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Publisher listening at http://172.18.0.9:${port}`);
});
