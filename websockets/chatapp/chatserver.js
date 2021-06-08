
var WebSocketServer = require('websocket').server;


var http = require('http');
var webSocketsServerPort = 1337;
var history = [];
var clients = [];
//  funtion to handle special characters 
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
// colours  in random order
colors.sort(function (a, b) { return Math.random() > 0.5; });

//creating server 
var server = http.createServer(function (req, res) {
    //it will be empty because we dont need anyhting here 

});
// it be provide info on cosole after the server is running 
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
    WsServer = new WebSocketServer({

        httpServer: server
    });

    // it will sow the data of the user everytime any user connects to sever
    WsServer.on('request', function (request) {
        console.log((new Date()) + ' Connection from origin '
            + request.origin + '.');

        var connection = request.accept(null, request.origin);

        var index = clients.push(connection) - 1;
        var userName = false;
        var userColor = false;

        console.log((new Date()) + ' Connection accepted.');
        // it will show the history upto 100 messages of everyuser
        if (history.length > 0) {
            connection.sendUTF(
                JSON.stringify({ type: 'history', data: history }));
        }

        // it will show the user message will the user color and date 
        connection.on('message', function (message) {

            if (message.type == 'utf8') {
                if (userName === false) {
                    // remember user name
                    userName = htmlEntities(message.utf8Data);
                    userColor = colors.shift();
                    connection.sendUTF(
                        JSON.stringify({ type: 'color', data: userColor }));
                    console.log((new Date()) + ' User is known as: ' + userName
                        + ' with ' + userColor + ' color.');


                }
                else { // log and broadcast the message
                    console.log((new Date()) + ' Received Message from '
                        + userName + ': ' + message.utf8Data);
                    var obj = {
                        time: (new Date()).getTime(),
                        text: htmlEntities(message.utf8Data),
                        author: userName,
                        color: userColor
                    };
                    history.push(obj);
                    history = history.slice(-100);
                    var json = JSON.stringify({ type: 'message', data: obj });
                    for (var i = 0; i < clients.length; i++) {
                        clients[i].sendUTF(json);
                    }
                }
            }

        });
        // after the user disconnected it will show message to every other user 
        connection.on('close', function (connection) {
            if (userName !== false && userColor !== false) {
                console.log((new Date()) + " Peer "
                    + connection.remoteAddress + " disconnected.")

                clients.splice(index, 1);
                // push back user's color to be reused by another user
                colors.push(userColor);
            }

        });

    });
})
