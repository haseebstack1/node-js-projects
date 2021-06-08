const { urlencoded } = require('express');
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const app = express();

app.use(helmet())

app.use(express.static('public'))

app.use(express.json());

app.use(express.urlencoded());



app.set('view engine', 'ejs')
app.set('views   ', path.join(__dirname, 'views'))

// 3 we pass res.render 2 things
// --- the file we want to use 
// --- the data we want to sent to that file
// 4 express use the node module for our specified view engine and parse the file 
//  this means it takes the html/css/ js and combine it whatever  "node " there is in 
//  6the final result of this process is a compiled product of things the browser  can read 

function validatedUser(req, res, next) {
    res.locals.validated = true;
    next();

}
app.use(validatedUser)

app.get('/', (req, res, next) => {
    // the data in the 2nd args is going to be appended to res.locals

    res.render("index", {
        msg: "success !!",
        name: "haseeb zahid ",
        html1: '<img src="1.jpg" />',
        html: '<Img src="https://picsum.photos/200/300"/>'
    })

})
app.listen(3000)