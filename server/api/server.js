 
 const db = require('./config/db');
 const app = require('./config/app').app;
 const router = require('./routes/router');
 const socket_server = require('../api/socket_server/socket');

app.listen(5000,function() {
    console.log('servidor ligado!');
});