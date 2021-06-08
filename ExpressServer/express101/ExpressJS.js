// node is language
// express in node , node module 
// 
const path = require('path');
// http is native module 
// const http=require("http")

// express is third party moduule 
const express = require("express")
// an app is the xpress function (create application inside the express module )



const app = express();

// // all is  a method , it takes two args:
// 1 route 
// 2 callback to run if the route is requested 
app.use(express.static('public'));

app.all('/', (req, res) => {

    // express handle the basic headers 
    console.log(path.join(__dirname + "/node.html"));
    res.sendFile(path.join(__dirname + "/node.html"))

    // express handles the end ()

})
app.all("*", (req, res) => {

    res.send("<h1>soryy this page doesnot exist </h1>")
})

app.listen(3000)
console.log("the server is listning on port 3000....");