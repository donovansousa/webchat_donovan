 
 const db = require('./config/db');
 const app = require('./config/app').app;
 const router = require('./routes/router');

app.listen(3000,function() {
    console.log('servidor ligado!');
});