

////////////////////////////// uploading file and moving file //////////////////////

var http = require('http');

var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        console.log("A")
        var form = new formidable.IncomingForm();
        console.log("B")
        form.parse(req, function (err, fields, files) {
            console.log("C")
            var oldpath = files.filetoupload.path;
            console.log("D")
            var newpath = "new " + files.filetoupload.name;
            console.log("E")
            fs.rename(oldpath, newpath, function (err) {
                console.log("F")
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        console.log("G")
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);