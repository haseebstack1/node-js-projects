const { urlencoded } = require('express');
const express = require('express')
const app = express();
const helmet = require('helmet');
app.use(helmet());
const path = require('path');
const cookieParser = require('cookie-parser');
const { networkInterfaces } = require('os');

app.use(express.static('public'));
app.use(urlencoded());
app.use(express.json());
app.use(cookieParser());

app.set("view engine", 'ejs')
app.set("views", path.join(__dirname, 'views'))

app.use((req, res, next) => {

    // console.log("Query Params", req.query);
    if (req.query.msg === "failed") {

        res.locals.msg = 'sorry this id and pass dosent exsist'
        // send me to next piece of middleware 
        // console.log(res.locals.msg)
    } else {
        res.locals.msg = ''



    }
    next()


})

app.get("/", (req, res, next) => {

    res.redirect('/login')

})

app.get("/login", (req, res, next) => {

    res.render("login")

})
app.post("/process_login", (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (password === "x") {
        // res.cookie takes 2 args :
        // 1 cookie name 
        // 2 value to set it to 

        res.cookie('username', username)
        // res.redirect takes 1 arg :
        // 1 where to send the browser 
        res.redirect('/welcome')

    }
    else {

        res.redirect('/login?msg=failed&test=hello')
    }




    // req.body is made by urlencoded
    // res.json(req.body)

})


// app.param takes 2 args :
// 1 pram to look for in route 
// 2the call to run (with the usual )
app.param('storyId', (req, res, next, storyId) => {

    console.log("story called id :", storyId)
    next()

})

app.get('/story/:storyId', (req, res, next) => {

    res.send(`<h1>story ${req.params.storyId}</h1>`)

})
app.get("/welcome", (req, res, next) => {

    res.render('welcome', {
        username: req.cookies.username
    })

})

app.get("/statement", (req, res, next) => {
    // this will render the statement in browser 
    // res.sendFile(path.join(__dirname, "userstatements/BankStatementChequing.png"))

    // app has a download method takes 2 args 
    // 1 file name 
    // 2 optionally the file name which you want the file name todownload as 

    // download is setting the Header
    // 1 comtent disposition to attachment ,with a file name of 2nd arg 
    res.download(path.join(__dirname, "userstatements/BankStatementChequing.png"))

})

app.get("/logout", (req, res, next) => {
    // res.clearCookie takes 1 arg :
    // 1 clear cookie by name 
    res.clearCookie("username")
    res.redirect("/login")

});
app.listen(3000)