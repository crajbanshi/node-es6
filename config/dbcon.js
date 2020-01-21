import mongoose from 'mongoose';
import config from './config';

let host = config.db.mongodb.host;
let port = config.db.mongodb.port;
let dbname = config.db.mongodb.dbname;

var url = `mongodb://${host}:${port}/${dbname}`;

if (config.env && config.env == 'prod') {
    let dbusername = config.db.mongodb.username;
    let dbpassword = config.db.mongodb.password;
    var url = `mongodb://${dbusername}:${dbpassword}@${host}:${port}/${dbname}`;
}

if (mongoose.connection.readyState == 0) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}
var db = mongoose.connection;

db.on('error', function(err) {
    console.error.bind(console, 'connection error: ' + url);
    throw err;
});

db.once('open', function() {
    console.log("Connection Successful!");
});

export default db;