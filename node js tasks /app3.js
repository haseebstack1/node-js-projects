var http = require('http');

var app = http.createServer(function (req, res) {

    if (req.url === "/post" && req.method === "POST") {
        // console.log(req.method);
        res.setHeader('Content-Type', 'application/json');

        // console.log(req);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });


        req.on('end', () => {
            console.log(body);
            res.end(body);
        });
    }
    else
        if (req.url === "/post" && req.method === "GET") {
            // console.log(req.method);
            res.setHeader('Content-Type', 'application/json');

            // console.log(req);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();


                req.on('end', () => {
                    console.log(body);
                    res.end(body);
                });

            });



        }

    // else if (req.url=== "/get" && req.method === "GET"){
    //     req.
    // }
}).listen(3000);