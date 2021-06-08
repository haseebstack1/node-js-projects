const express = require("express");

const app = express();

console.log("the port is listning on port 3000.....");

app.get('/', (req, res) => {
    res.send("Get REQ")
})
app.post('/', (req, res) => {
    res.send("post REQ")
})
app.delete('/', (req, res) => {
    res.send("del REQ")
})
app.put('/', (req, res) => {
    res.send("put REQ")
})
app.listen(3000)