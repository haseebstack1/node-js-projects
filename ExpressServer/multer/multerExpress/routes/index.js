var express = require('express');
var router = express.Router();
const fs =require('fs')

const multer= require('multer')
const upload = multer({dest: 'public/images/uploads'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub',upload.single('pic'),(req,res,next)=>{
// console.log(req.file)
const newpath =`public/images/uploads${req.file.originalname}`;
fs.rename(req.file.path,newpath,()=>{})
res.json("File Uploaded")

})

router.post('/formsubarray',upload.array('pic'),(req,res,next)=>{
// console.log(req.file)
const newpath =`public/images/uploads${req.files.originalname}`;
fs.rename(req.files.path,newpath,()=>{})
res.json("File Uploaded")

})
module.exports = router;

