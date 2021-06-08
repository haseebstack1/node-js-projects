const express = require("express")
const app = express();
var cors = require('cors')
const helmet = require('helmet')

app.use(helmet())



app.use(express.static('public'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post("/ajax", (req, res) => {
    // req.header('Access-Control-Allow-Origin', '*')


    console.log("Body", req.body);
    // let { firstName, lastName } = req.body
    // console.log("First name", firstName);
    // console.log("Last name", lastName);

    res.json({
        success: true,
        message: "AJAX call is working fine!"
    });

})
app.listen(3000);