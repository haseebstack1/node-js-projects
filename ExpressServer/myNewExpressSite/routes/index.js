var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {

  // res.set('Cache-control', "no-store")

  // fresh ans stale 
  // fresh returns true if its not  stale 
  console.log(req.fresh);
  console.log(req.stale);
  res.render('index', { title: 'Express' });
});

module.exports = router;
