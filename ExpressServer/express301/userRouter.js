const express = require('express');
const { route } = require('./theRouter');
let router = express.Router();

// instead of using 
// app.get(....)
// we will use 
//  router.get
function validatedUSer(req, res, next) {

    res.locals.validated = true;
    console.log("validated")
    next();

}
// validatedUSer is a middleware that will be only added to this route
// in others words the main router dosent know about this  


router.use(validatedUSer)
router.get('/', (req, res, next) => {

    res.json({

        msg: " user router works"
    })

})
module.exports = router;