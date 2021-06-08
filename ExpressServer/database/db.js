const express = require("express");
const app = express();

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoUrl = `mongodb://localhost:27017`;

let db;
mongoClient.connect(mongoUrl, (error, databaseConn) => {
  db = databaseConn.db("mydb");
});

app.get("/", (req, res) => {
  db.collection("customers")
    .find({})
    .toArray((queryError, Results) => {
      console.log(Results);
      res.json(Results);
    });
});
app.listen(3000);
