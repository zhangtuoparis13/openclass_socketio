var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
// var io = require('socket.io').listen(server);
var socket = require('socket.io');
var io = socket.listen(server);

io.sockets.on('connection', function (client, pseudo) {
    // Quand un client se connecte, on lui envoie un message,
    // emit the 'message' event on the client
    console.log('Client connected');
    client.emit('messages', {hello: 'world'});
});

server.listen(8081);
