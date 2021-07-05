var express = require('express');
var router = express.Router();

var ownerModule=require('../modules/owner');
var adminUserModule=require('../modules/adminUser');
var teacherModule=require('../modules/teacher');
var studentUserModule=require('../modules/studentUser');

var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');

function check_TeacherStatus(req,res,next){
  var email=req.body.email;
  var chekUser=teacherModule.findOne({email:email});
  chekUser.exec((err,data)=>{
    if(data){
      var teacher_status = data.teacher_status;
      if(teacher_status=="disabled"){
        return res.send({redirectTo: 'Please Contact School Staff'});
      }
    }
 next();
  });
}

function check_StuStatus(req,res,next){
  var email=req.body.email;
  var chekUser=studentUserModule.findOne({email:email});
  chekUser.exec((err,data)=>{
      if(err) throw err;
      if(data){
        var status = data.status;
        if(status=="disabled"){
          return res.send({redirectTo: 'Please Contact School Staff'});
        }
      }
     next();
  });
}

router.get('/', function(req, res, next) {
  if(req.session.admin_email){
    res.redirect('/admin-auth');
  }else if(req.session.stu_email){
    res.redirect('/dashboard');
  }else if(req.session.teacher_email){
    res.redirect('/dashboard');
  }else{
    res.render('index', { title: 'Password Management System'});
  }
});

 router.post('/post',check_StuStatus,check_TeacherStatus,function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  var checkEmail=adminUserModule.findOne({email:email});
  checkEmail.exec((err, data)=>{
    if(err) throw err;
    if(data){
      var getPassword=data.password;
      if(bcrypt.compareSync(password,getPassword)){
        req.session.admin_email = email;
        res.send({redirect:'/admin-auth'});
      }else{
        res.send({redirectTo: 'Invalid Password.'});
      }
    }else{
      var checkEmail=studentUserModule.findOne({email:email});
      checkEmail.exec((err, data)=>{
        if(err) throw err;
        if(data){
          var school_key=data.school_key;
          var getStuPassword=data.password;
          if(bcrypt.compareSync(password,getStuPassword)){
            req.session.stu_email = email;
            req.session.school_session_key = school_key;
            res.send({redirect:'/dashboard'});
          }else{
            res.send({redirectTo: 'Invalid Password.'});
          }
        }else{
          var checkEmail=teacherModule.findOne({email:email});
          checkEmail.exec((err, data)=>{
            if(err) throw err;
            if(data){
              var getTeacherPassword=data.password;
              var school_key=data.school_key;
              if(bcrypt.compareSync(password,getTeacherPassword)){
                req.session.teacher_email = email;
                req.session.school_session_key = school_key;
                res.send({redirect:'/dashboard'});
              }else{
                res.send({redirectTo: 'Invalid Password.'});
              }
            }else{
              return res.send({redirectTo: 'user not found'});
            }
          })  
        }
      });
    }
  });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Password Management System', msg:'' });
});

function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=adminUserModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'Password Management System', msg:'Email Already Exist !' });
    }
   next();
  });
}

function checkConfPassword(req,res,next){
  var password=req.body.password;
  var confpassword=req.body.confpassword;
    if(password !=confpassword){
      return res.render('signup', { title: 'Password Management System', msg:'Password not matched!' });
    }
   next();
}
router.post('/signup',checkConfPassword,checkEmail,function(req, res, next) {
        var email=req.body.email;
        var admin_name=req.body.admin_name;
        var school_name=req.body.school_name;
        var password=req.body.password;
        password =bcrypt.hashSync(req.body.password,10);
        var userDetails=new adminUserModule({
          email:email,
          admin_name:admin_name,
          school_name:school_name,
          password:password, 
        });
      userDetails.save((err,doc)=>{
        if(err) throw err;
        res.render('signup', { title: 'Password Management System', msg:'User Registerd Successfully' });
      })  ;
});

module.exports = router;
