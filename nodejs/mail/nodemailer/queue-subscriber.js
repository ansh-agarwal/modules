
const config = require('./config.json')
const emailer_url = config.queue
const emailer = require('amqplib').connect(emailer_url);
const mailer = require('./queue.mailer')


emailer.then(function(conn) {
	var q = 'test';
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(q);
    ch.consume(q, function(msg) {
      if (msg !== null) {
        // body goes here
        var data = JSON.parse(msg.content);
        mailer(data.message, data.to)
        ch.ack(msg);
      }
    });
  });
  return ok;
}).then(null, console.warn);