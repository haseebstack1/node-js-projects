// const fs = require('fs');
// const https = require('https');
// // URL of the image
// const url = 'https://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg';
// https.get(url, (res) => {
//     // Image will be stored at this path

//     const path = './uploads/'



//     const filePath = fs.createWriteStream(path);


//     res.pipe(filePath);




//     // filePath.on('finish', () => {

//     console.log("g");

//     filePath.close();

//     console.log('Download Completed');

//     // })

// })



const http = require('http');
const fs = require('fs');
const { url } = require('inspector');
const { response } = require('express');
// http.createServer(function (res, req) {


const file = fs.createWriteStream("file1.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function (response) {
    response.pipe(file);

})
// })