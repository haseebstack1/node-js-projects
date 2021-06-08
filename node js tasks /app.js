






///////////////////getting data from a api //////////////////////

const https = require("https");

const Stream = require("stream").Transform;
const fs = require("fs");

https
    .get("https://api.nasa.gov/planetary/apod?api_key=3yi4sR8AnTDNWjQUb6LVyeG8EaLghJiXQNqTWXqC", resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
            console.log(url);

            https.get(url, res => {
                //the response should be  an image
                console.log(res.headers);
                console.log(res.headers["content-type"], res.headers["content-length"]);

                if (
                    res.statusCode == 200 &&
                    res.headers["content-type"] == "image/jpeg"
                ) {
                    let img = new Stream();

                    res.on("data", chunk => {
                        img.push(chunk);
                    });

                    res.on("end", () => {
                        let filename = __dirname + "/apod.jpg";
                        fs.writeFileSync(filename, img.read());
                    });
                }
            });
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    });