const express = require("express");
const app = express();

// app come with a use method
// use takes 1 arg
// 1. the middle ware tou want to run 

app.use(express.static('public'))

app.listen(3000)
