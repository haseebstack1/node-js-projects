const { response } = require("express");

const express = require("express"),
    app = express(),
    http = require("http").createServer(app).listen(80),
    upload = require("express-fileupload");
app.use(upload())
console.log("server started")
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


})
app.post("/fileUpload", function (res, req) {
    console.log("11");
    console.log(req.files);

    if (req.files) {

        console.log("2");
        console.log(req.files)
        var file = req.files.filename,
            filename = filename.name;
        file.mv("./uploads/" + filename, function (err) {
            console.log("3");
            if (err) {
                console.log("4");
                console.log(err)
                res.send("error occured")

            } else {
                res.end("done!")
                console.log("5");
            }
            // console.log(req);

        })
    }

    console.log("-1");

})