const { json, Router } = require('express');
var express = require('express');
var router = express.Router();
const request = require('request');
const { response } = require('../app');

const apikey = '123456789'



const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apikey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


router.use((req, res, next) => {

  res.locals.imageBaseUrl = imageBaseUrl;
  next();

})
/* GET home page. */
router.get('/', function (req, res, next) {

  request.get(nowPlayingUrl, (error, response, movieData) => {

    // console.log("========the Error=======")
    // console.log(error);
    // console.log("========the response=======")
    // console.log(response);
    const parsedData = JSON.parse(movieData)
    // console.log("Movie Data", parsedData);
    res.render('index', { parsedData: parsedData.results })
  })
});
// /movie/:id is a wild card 
router.get("/movie/:id", (req, res, next) => {

  // res.json(req.params.id)
  const movieID = req.params.id;
  const thismovieUrl = `${apiBaseUrl}/movie/${movieID}?api_key=${apikey}`
  request.get(thismovieUrl, (error, response, movieData) => {

    const parsedData = JSON.parse(movieData)
    res.render("single-movie",
      {
        parsedData


      })

  })


})

router.post("/search", (req, res, next) => {

  // res.send("check")
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;

  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apikey}`
  // res.send(movieUrl)
  request.get(movieUrl, (error, response, movieData) => {
    let parsedData = JSON.parse(movieData);
    if (cat === "company") {
      res.render("comapnies", { parsedData: parsedData.results })


    }


    if (cat === "person") {


      parsedData.results = parsedData.results[0].known_for;
      console.log(movieUrl)
      res.render("index", { parsedData: parsedData.results })
    } else {
      res.render("index", { parsedData: parsedData.results })
    }
  })
})
module.exports = router;
