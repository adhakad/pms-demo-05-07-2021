var express = require('express');
var router = express.Router();

var teacherModule=require('../../modules/teacher');
var classModule=require('../../modules/class');
var classTeacherModal=require('../../modules/classTeacher');

const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/',function(req, res,) {
  var email=req.session.teacher_email;
  var getTeacher=teacherModule.findOne({email:email});
  getTeacher.exec((err, data)=>{
    if(err) throw err;
    var id = data.teacher_uid;
    if(data){
      var getClass=classModule.findOne({teacher_id:id});
      getClass.exec((err, datas)=>{
        classTeacher=classTeacherModal.find({teacher_uid:id});
        classTeacher.exec((err,result)=>{
          if(err) throw err;  
          if(result==null){
            if(datas==null){
              res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:'',result:'' });
            }else{
              res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:datas,result:'' });
            }
          }else{
            if(datas==null){
              res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:'',result:result });
            }else{
              res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:datas,result:result });
            }
          }       
        });
      });
    }else{
      res.send('data not found');
    }
  });
});

    function checkClass(req,res,next){
      var room_id=req.body.room_id; 
      var checkExitStudent_id=classModule.findOne({room_id:room_id});
      checkExitStudent_id.exec((err,datass)=>{
         if(err) throw err;
         if(datass){
            return res.send({redirectTo: 'This Room Id Already Created !'});
         }
        next();
      });
    }
    router.post('/post',checkClass,function(req, res, next) { 
      var email=req.session.teacher_email;
      var class_name=req.body.class_name;  
      var subject_name=req.body.subject_name; 
      var room_id=req.body.room_id; 
      var getTeacher=teacherModule.findOne({email:email});
      getTeacher.exec((err, data)=>{
        var tObj_id=data._id;
        var teacher_id= data.teacher_uid; 
        var school_key=data.school_key;
        var getClass= classModule.findOne({school_key:school_key});
        getClass.exec(function(err,datas){
          if(err) throw err;
          if(datas==null){
            var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{class_name:class_name});
            UdtTeacherProfile.exec(function(err){
               if(err) throw err;
            });
            var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{subject_name:subject_name});
            UdtTeacherProfile.exec(function(err){
               if(err) throw err;
            });
            var getTeacher= teacherModule.findOne({teacher_uid:teacher_id});
              getTeacher.exec(function(err,dataPass){
                if(err) throw err;
                var password = dataPass.password;
                var userDetails=new classModule({
                  tObj_id:tObj_id,
                  teacher_id:teacher_id,
                  class_name:class_name,
                  subject_name:subject_name,
                  room_id:room_id,
                  school_key:school_key,
                  password:password,
                });
                userDetails.save((err)=>{
                  if(err) throw err; 
                  res.send({redirects:'/teacher-admin-dashboard'});
                });
              });
          }else{
            var class_name_exist = datas.class_name;
            if(class_name_exist == class_name){
              res.send({redirectTo: 'This Class Already Created'});
            }else{
              var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{class_name:class_name});
              UdtTeacherProfile.exec(function(err){
                if(err) throw err;
              });
              var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{subject_name:subject_name});
              UdtTeacherProfile.exec(function(err){
                if(err) throw err;
              });
              var getTeacher= teacherModule.findOne({teacher_uid:teacher_id});
                getTeacher.exec(function(err,dataPass){
                  if(err) throw err;
                  var password = dataPass.password;
                  var userDetails=new classModule({
                    tObj_id:tObj_id,
                    teacher_id:teacher_id,
                    class_name:class_name,
                    subject_name:subject_name,
                    room_id:room_id,
                    school_key:school_key,
                    password:password,
                  });
                  userDetails.save((err)=>{
                  if(err) throw err;
                  res.send({redirects:'/teacher-admin-dashboard'});
                });
              });
            }
          }
        });
      });   
    });

//delete class code start
router.delete('/delete', function(req, res,) {
  var teacher_id=req.body.id;
  var exist_id=1234567890;
  var class_name=224165;
  var subject_name="saw24d66tfsw";
  var teacherAdminClass=teacherModule.findOne({teacher_uid:teacher_id});
  teacherAdminClass.exec(function(err,data){
    if(err) throw err;
    var ObjectId_id = data._id; 
    var teacherAdminClassDelete=classModule.findOneAndDelete({teacher_id:teacher_id});
    teacherAdminClassDelete.exec(function(err){
      if(err) throw err;
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{exist_id:exist_id});
      UdtTeacherProfile.exec(function(err,data){
        if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{class_name:class_name});
      UdtTeacherProfile.exec(function(err,data){
        if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{subject_name:subject_name});
      UdtTeacherProfile.exec(function(err,data){
        if(err) throw err;
      });
      res.send({redirects:'/teacher-admin-dashboard'});
    });
  });
});




router.post('/class_start',function(req,res) {
  var teacher_id=req.body.teacher_id; 
  var checkUser=classModule.findOne({teacher_id:teacher_id});
  checkUser.exec((err, data)=>{
    if(data){  
      if(err) throw err;
      var teacher=teacherModule.findOne({teacher_uid:teacher_id});
      teacher.exec((err, datas)=>{
        var tObj_id=datas._id;
        var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{exist_id:teacher_id});
       UdtTeacherProfile.exec(function(err){
         if(err) throw err;
       });
       var room_id = data.room_id;
       res.redirect('/room/'+room_id+'/'+teacher_id);
      });
    }
  });
});

  module.exports = router;