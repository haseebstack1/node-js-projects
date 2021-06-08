var express = require('express');
var router = express.Router();

const movieDetail = require("../data/moviedetails")

function requireJson(req, res, next) {


    if (req.headers["content-type"] !== 'application/json') {

        res.json({ msg: 'content type must be application/json' })
    }
    else {
        next()

    }
}

// router.param(('movieID'), (req, res, next) => {
//     console.log("someone used the movie id wildcard ");
//     next();



// })


router.post("/testing",requireJson,(req,res)=>{
    console.log("Body",req.body);
    res.json(req.body)
})

router.get('/top_rated', (req, res, next) => {

    let page = req.params.page
    if (!page) {

        page = 1;

    }
    const results = movieDetail.sort((a, b) => {

        return b.vote_average - a.vote_average

    })
    const indextoStart = (page - 1) * 20;
    res.json(results.slice(indextoStart, indextoStart + 20));


})
/* GET movie page. */
router.get('/:movieID', function (req, res, next) {
    const movieID = req.params.movieID
    const results = movieDetail.find((movie) => {
        // console.log(movie.id, "======", movieID)
        
        return movie.id ==movieID ;


    })
    // console.log(movieID)
    //     console.log(results)
    
    if (!results) {

        res.json({
            msg: "movie id not found",
            production_companies: []
        })
    } else {
res.json(results)    }
});

router.post('/:movieID/rating',(req, res) => {



    const movieID = req.params.movieID;
    
    const userRating = req.body.value;

    if ((userRating < 0.5) || (userRating > 10)) {

        res.json({ msg: 'rating must be between .5 and 10' })
    } else {
        res.json({
            msg: "thankyou for rating, JSON",
            status_code: 200
        })
    }
});



router.delete('/:movieID/rating', requireJson, (req, res, next) => {

    res.json({ msg: 'Rating Deleted' })


})
module.exports = router;
