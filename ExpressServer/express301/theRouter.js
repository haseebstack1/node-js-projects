const express = require('express');
let router = express.Router();

// instead of using 
// app.get(....)
// we will use 
//  router.get
router.get('/', (req, res, next) => {

    res.json({

        msg: "router works"
    })

})
module.exports = router;