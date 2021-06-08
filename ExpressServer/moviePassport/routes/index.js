const { json, Router } = require("express");
var express = require("express");
var router = express.Router();
const request = require("request");
const passport = require("passport");

const { response } = require("../app");

const apikey = "1fb720b97cc13e580c2c35e1138f90f8";

const apiBaseUrl = "http://api.themoviedb.org/3";
// const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apikey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";
// router.use((req, res, next) => {
//   console.log("Current User", req.user && req.user.username);

//   next();
// });

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
/* GET home page. */
router.get("/", function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    // console.log("Current User", req.user);
    // console.log("========the Error=======")
    // console.log(error);
    // console.log("========the response=======")
    // console.log(response);

    const parsedData = JSON.parse(movieData);
    // console.log("User", req.user && req.user.username);

    res.render("index", {
      parsedData: parsedData.results,
      user: req.user && req.user.username,
      // name: req.user.username,
      // name: req.user.username,
    });
  });
});

router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginfailed",
  })
);

// /movie/:id is a wild card
router.get("/movie/:id", (req, res, next) => {
  // res.json(req.params.id)
  const movieID = req.params.id;
  const thismovieUrl = `${apiBaseUrl}/movie/${movieID}?api_key=${apikey}`;
  request.get(thismovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render("single-movie", {
      parsedData,
      user: req.user && req.user.username,

      // req.user !== undefined ? req.user : { username: "", avatar_url: "" },
    });
  });
});

router.post("/search", (req, res, next) => {
  // res.send("check")
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;

  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apikey}`;
  // res.send(movieUrl)
  request.get(movieUrl, (error, response, movieData) => {
    let parsedData = JSON.parse(movieData);
    if (cat === "company") {
      res.render("comapnies", { parsedData: parsedData.results });
    }

    if (cat === "person") {
      parsedData.results = parsedData.results[0].known_for;
      console.log("Testing", movieUrl);
      res.render("index", {
        parsedData: parsedData.results,
        user: req.user && req.user.username,
      });
    } else {
      res.render("index", {
        parsedData: parsedData.results,
        user: req.user && req.user.username,
      });
    }
  });
});
router.get("/logout", (req, res, next) => {
  res.redirect("/");
  req.session.destroy();
});
module.exports = router;
