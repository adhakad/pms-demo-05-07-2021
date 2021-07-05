var express = require('express');
var router = express.Router();
var totalAdminClass=require('../../../modules/totalAdminClass');

var bodyParser = require('body-parser');
var path = require('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));
router.use(express.static(__dirname+"./public/script/ajax/admin/totalAdminClass/"));


function checkClass(req,res,next){
  var class_name =  req.body.class_name;
  var totalClass=totalAdminClass.findOne({class_name:class_name});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(data)
    {
     return res.send({redirect: "Class Detail's Already Exist!"});
    }
    next();
  });
} 

router.get('/', function(req, res, next) {
   res.render('admin/totalAdminClass/totalAdminClass');
});

router.post('/post',checkClass,function(req, res, next) {
  var class_name =  req.body.class_name; 
  var totalClass = new totalAdminClass({
    class_name: class_name,
  });
  totalClass.save((err,doc)=>{
    if(err) throw err;
    res.send({redirect:"Class Detail's Inserted Successfully!"}); 
   });
});

router.get('/get',function(req, res, next) {
  var totalClass=totalAdminClass.find({});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success',data:data});
    }
  }); 
});


router.delete('/delete',function(req, res, next) {
  var id = req.body.id;
  var totalClass=totalAdminClass.findByIdAndDelete({_id:id});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success'});
    }
  }); 
});

module.exports = router;