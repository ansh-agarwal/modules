const config = require('./config.json')
const emailer_url = config.queue

const emailer = require('amqplib').connect(emailer_url);


module.exports = function(message,to){

	return new Promise(function(resolve, reject){
		var q = 'test';
		emailer.then(function(conn) {
  			var ok = conn.createChannel();
  			ok = ok.then(function(ch) {
    			ch.assertQueue(q);
    			ch.sendToQueue(q, new Buffer(JSON.stringify({"message": message, "to" : to })));
				});
 			resolve(ok);
		})
	});
}