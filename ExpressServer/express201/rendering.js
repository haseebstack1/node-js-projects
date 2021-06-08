const { urlencoded } = require('express');
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const app = express();

app.use(helmet())
// serve up static files 
app.use(express.static('public'))
// parse json and urlencoded data into req.body
app.use(express.json());

app.use(express.urlencoded());

// app.set()
// takes 2 args 
// 1 key  ==== view engine 
// 2 value ==== type of view engine 

app.set('view engine', 'pug')
app.set('views   ', path.join(__dirname, 'views'))
// 1 we define a view engine 
// --- ejs 
// --- mustache
// --- handlebars
// ---jade/pug
// 2 inside one our routes we have res.render
// 3 we pass res.render 2 things
// --- the file we want to use 
// --- the data we want to sent to that file
// 4 express use the node module for our specified view engine and parse the file 
//  this means it takes the html/css/ js and combine it whatever  "node " there is in 
//  6the final result of this process is a compiled product of things the browser  can read 



app.get('/', (req, res, next) => {

    res.render("index")

})
app.listen(3000)