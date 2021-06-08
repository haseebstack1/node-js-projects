


////////////////simple get and post api///////////////////

var http = require("http");
var app = express();
var fs = require('fs');
app.get('/listusers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
        console.log("hello world");

    });

})


var server = app.listen(8081, function () {
    var host = server.address().address || listusers
    var port = server.address.port || 8081
    console.log("Example app listening at http://%s:%s", host, port)
})




