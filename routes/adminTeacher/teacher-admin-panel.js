var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');

router.get('/', function(req, res, next) {
  var email=req.session.teacher_email;
  var check=teacherModule.findOne({email:email});
  check.exec((err, data)=>{
    res.render('teacher-login', { title: 'Password Management System',data:data});
  });
});

router.post('/post',function(req, res, next) {
  var email=req.session.teacher_email;
  var pin = req.body.pin;
  var checkUser=teacherModule.findOne({email:email});
  checkUser.exec((err, data)=>{
    if(err) throw err;
    var pins = data.pin;
    if(pin==pins){
      res.send({redirect:'/teacher-admin-dashboard'});
    }else if(pin==121212){
      res.send({redirectTo: 'Invalid Pin.'});
    }else{
      res.send({redirectTo: 'Invalid Pin.'});
    }
  });
});

router.put('/set-pin',function(req, res, next) {
  var email = req.session.teacher_email;
  var pin=req.body.pin;
  var check=teacherModule.findOne({email:email});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var obj_id = data._id;
      var teacherUpdate=teacherModule.findByIdAndUpdate(obj_id,{pin:pin});
      teacherUpdate.exec((err,data)=>{
        if(err) throw err;
        res.send({redirect:'/teacher-admin-panel'});
      });
    }
  })
});

module.exports = router;