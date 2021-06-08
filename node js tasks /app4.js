

////////////////////////getting jason response and submiting jason response //////////////////

var http = require('http');
var util = require('util');
qs = require('querystring');
//  const { url } = require('inspector');
const url = require("url");

var app = http.createServer(function (req, res) {
    if (req.method === 'POST') {

        // console.log("Request", req);

        // let { url, method } = req

        // console.log("URL", url);
        // console.log("Method", method);
        // let parsedURL = require("url").parse("localhost:3000/post?name=haseeb&age=21");
        // console.log(parsedURL);
        // console.log(typeof parsedURL);

        // console.log(JSON.parse(req.));


        var url_parts = url.parse(req.url, true);
        console.log(url_parts.query);
        console.log(typeof JSON.stringify(url_parts.query));
        res.end(JSON.stringify(url_parts.query));
        console.log("POST req");
        // res.end("OK")//parsedURL.query)

        // console.log(req.method);
        // var body = "";
        // req.on('data', function (data) {

        //     body = +data;

        // });
        // req.on('end', function (body) {

        //     var data1 = qs.parse(body);
        //     console.log(data1);

        // })
        // res.writeHead(200, { 'Content-Type': 'application/json' });

        // res.write("Testing get request \n");
        // const queryObject = parse(req.url, true).query;

        // console.log("Request Obj", req);
        // console.log("Query string", queryObject);


        // console.log();
        // res.end(queryObject);
        // res.end(queryObject);
        // consol.log(queryobject);
        // else if (req.url=== "/get" && req.method === "GET"){
        //     req.
        // }
    }
    else if (req.method === 'GET') {
        var url_parts = url.parse(req.url, true);
        console.log(url_parts.query);
        // console.log(typeof JSON.stringify(url_parts.query));
        res.write(JSON.stringify(url_parts.query))
        res.end("\nget req")
    }
    else {
        console.log("request", req);
        res.end("Invalid URL")
    }

}).listen(3000);