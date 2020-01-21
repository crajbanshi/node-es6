import redis from 'redis';
import config from './config';

/* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
var client = redis.createClient({
    port: config.redis.port, // replace with your port
    host: config.redis.host, // replace with your hostanme or IP address
    // password: config.redis.password, // replace with your password

});

client.on('connect', function() {
    console.log('connected');
});

client.on('error', function(error) {
    console.log(error);
});

export default client;