const http = require('http');
const ws = require('socket.io')(http);
const PORT = 5001;
let messages = [];
let sockets = [];
let users = [];

ws.on('connect',function(socket) {

    sockets.push(socket);

    socket.emit('user_connected','Bem vindo <3');

    socket.on('send_message',(data) => {

        messages.unshift(JSON.parse(data));
        ws.sockets.emit('receive_message',JSON.stringify(messages));
    
    });

    socket.on('register_username_and_valid_if_the_user_is_already_connected',(username,callback) => {

        let userAlreadyLogged = sockets.find((res) => {
            return res.username === username;
        });
        
        if (userAlreadyLogged) {
            socket.emit('user_already_logged');
            return;
        }

       var index =  sockets.indexOf(socket);
        sockets[index].username = username;

        users.push(username);

        ws.sockets.emit('get_usersconnected',JSON.stringify(users));
        ws.sockets.emit('user_is_not_connected_so_go_to_welcome_message',JSON.stringify(users));
         
    });

    socket.on('disconnect',() => {

        var index = users.indexOf(socket.username);

        if (index == 0) {
            return;
        }

        users.splice(index,1);
        ws.sockets.emit('get_usersconnected',JSON.stringify(users));

        let username = socket.username;
        let date = new Date();
        let result_date = date.getDate() + 
                                "/" +
                                 (date.getMonth() + 1) + 
                                 "/" + 
                                 date.getFullYear() + 
                                 " " + 
                                 date.getHours() + 
                                 ":" + 
                                 date.getMinutes() + 
                                 ":" + 
                                 date.getSeconds();

        let send = {
            from:username,
            to:'todos',
            date:  result_date,
            disconnected:true
        };

        messages.unshift(send);

        ws.sockets.emit('receive_message',JSON.stringify(messages));
    });
   
});

 

let server = http.createServer();
server.listen(PORT,function() {
    console.log('socket server ligada na porta: ' + PORT);
});

ws.listen(server);