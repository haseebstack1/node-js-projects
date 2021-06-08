// const express = require("express")
// const app = express();

// // expreess is 2 thing 
// // 1. routes 
// // 2 middleware that comprise a frame work 


// // REQ------middleware----> res
// // middleware function is any function that has acces to res , req , next object


// // REQ------middleware----> res

// // 1 res comes in 
// // 2 we need to validate user , something 
// // 3 we need to store something in database 
// // 4 if there is data fom the user we need to parse it and store it 

// function validateUser(req, res, next) {

//     // get info out of the req object
//     res.locals.validated = true
//     console.log("validated")
//     next();

// }
// //this will run valedateuser on all path and all methods 
// app.use(validateUser)
// //this will run valedateuser on /user and all methods
// app.use("/admin", validateUser)
// //this will run valedateuser on all path and all methods
// app.get("/admin", validateUser)


// app.get("/", (req, res, next) => {

//     res.send("<h1>hello</h1>")
//     console.log(res.locals.validated)

// })

// app.get("/admin", (req, res, next) => {

//     res.send("<h1>hello admin </h1>")
//     console.log(res.locals.validated)

// })
// app.listen(3000)
