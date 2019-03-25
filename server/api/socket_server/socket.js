const http = require('http');
const ws = require('socket.io')(http);
const PORT = 5001;
let messages = [];

ws.on('connect',function(socket) {

    socket.emit('welcome','Bem vindo !!!');
});


let server = http.createServer();
server.listen(PORT,function() {
    console.log('socket server ligada na porta: ' + PORT);
});

ws.listen(server);