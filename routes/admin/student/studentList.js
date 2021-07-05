var express = require('express');
var router = express.Router();

var studentUserModule=require('../../../modules/studentUser');
var classModule=require('../../../modules/class');
var totalAdminClass=require('../../../modules/totalAdminClass');

const { check, validationResult } = require('express-validator');
router.use(express.static('public'))
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/', function(req, res,) {
  var totalClass=totalAdminClass.find({});
  totalClass.exec((err,data)=>{
  if(err) throw err;
    res.render('./admin/students/studentClassList', { title: 'TechBista Solutions', records:data});
  });
});

router.get('/studentList/:id', function(req, res, next) {
  var school_key = req.session.school_session_key;
  var class_name=req.params.id;
  var getStudentUser= studentUserModule.find({class_name:class_name,school_key:school_key});
  getStudentUser.exec(function(err,data){
  if(err) throw err;
  res.render('./admin/students/studentsList', { title: 'TechBista Solutions',msg:'', data:data,disabled:"disabled" });
});
});


router.delete('/delete', function(req, res,) {
  var id=req.body.id;
  var student=studentUserModule.findOne({student_id:id});
  student.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;
    var studentStatus=studentUserModule.findByIdAndDelete(ObjectiId);
    studentStatus.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });  
  });
});

router.put('/enable', function(req, res,) {
  var id=req.body.id;
  var student=studentUserModule.findOne({student_id:id});
  student.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;
    var studentStatus=studentUserModule.findByIdAndUpdate(ObjectiId,{status:'enabled'});
    studentStatus.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });  
  });
});

router.put('/disable', function(req, res,) {
  var id=req.body.id;
  var student=studentUserModule.findOne({student_id:id});
  student.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;
    var studentStatus=studentUserModule.findByIdAndUpdate(ObjectiId,{status:'disabled'});
    studentStatus.exec(function(err){
      if(err) throw err;
      res.send({msg:'success'}); 
    });    
  });
});
 
module.exports = router;