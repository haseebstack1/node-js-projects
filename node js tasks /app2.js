






////////////////////simple routes and get post methods /////////////////////



var http = require('http');
const { url } = require('inspector');

// var app = express();
// var http = require("http");



//For express use only
// app.post('/addUser', function (req, res) {
//     res.write("hello");
//     res.end();
//     // First read existing users.
//     // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
//     //     data = JSON.parse(data);
//     //     data["user4"] = user["user4"];
//     //     console.log(data);
//     //     res.end(JSON.stringify(data));
//     //     console.log("done");
//     // });
// })

// var server = app.listen(8080, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
// })

//For http module
http.createServer(function (req, res) {

    if (req.url === '/a' && req.method === "GET") {

        console.log("Request Object");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Testing get request");
        res.end();
    }
    if (req.url == '/b' && req.method == "POST") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Testing get request 1");
        res.end();
        console.log("done1");
    }





}).listen(8080);