var MongoClient = require('mongodb').MongoClient;
const http = require("http");
// var url = "mongodb://localhost:27017/mydb";

const mongoose = require('mongoose')



http.createServer(function (req, res) {
    MongoClient.connect("mongodb://127.0.0.1:27017/mydb", function (err, db) {
        var dbo = db.db("mydb");
        if (err) throw err;







        if (req.url === "/get" && req.method === "GET") {
            dbo.collection("customers").find({}).toArray(function (err, result) {
                if (err) throw err;
                // console.log(err)
                console.log(result);
                // res.write(result);
                // console.log(result.name, result.adress);
                // res.write(JSON.stringify({ name: result.name, address: result.adress }))
                res.end();
                db.close();
            });
        }
        else if (req.url === "/post" && req.method === "POST") {
            // var values = { $set: { name: "ali", adress: "islamabad" } };
            var myobj = [
                { name: 'manzoor', address: 'Hilahore' },
                { name: 'zahid', address: 'karachi ' },

            ];
            dbo.collection("customers").insertMany(myobj, function (err, res) {
                if (err) throw err;
                // console.log("Number of documents inserted: " + res.insertedCount);
                db.close
            });

        }
        else
            if (req.url === "/put" && req.method === "PUT") {

                var myquery = { adress: "Canyon 123" };
                var newvalues = { $set: { name: "haseeb", adress: "islamabad" } };
                dbo.collection("customers").updateOne(myquery, newvalues, function (err, res,) {


                    db.close();

                });
            }
            else if (req.url === "/delete" && req.method === "DELETE") {
                var myquery = { name: "haseeb", adress: "islamabad" };
                dbo.collection("customers").deleteOne(myquery, function (err, res) {

                    console.log("deleted");
                    db.close();

                })

            }







    });
}).listen(3000)
