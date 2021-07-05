var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require("uuid");
var adminUserModule=require('../../../modules/adminUser');

router.get('/', function(req, res, next) {
 if(req.session.auth_email){
  res.redirect('/dashboard');
 }else{
  res.render('admin/admin-auth/admin-auth', { title: 'Password Management System'});
 }
});

function checkKey(req,res,next){
  var key=req.body.key;
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data==null){
      return res.send({redirectTo: 'Invalid Product Key'});
    }
   next();
  });
}
                                                               
router.post('/post',checkKey,function(req, res, next) {
  var admin_email = req.session.admin_email;
  var key=req.body.key;
  const school_key = uuidV4();
  var check=adminUserModule.findOne({key:key});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var email = data.email;
      var obj_id = data._id;
      var school_key2 = data.school_key;
      
        if(school_key2=="$2a$10$787pS7KmgBDMUDzANMdBh.k2creKQ6BJHn/M7Uf61W8DbzYdPLag"){
          req.session.auth_email = email;
          var auth_email = req.session.auth_email;
          req.session.school_session_key = school_key;
          if(admin_email==auth_email){
            var update=adminUserModule.findByIdAndUpdate(obj_id,{school_key:school_key});
            update.exec((err,data)=>{
              res.send({redirect:'/dashboard'});
            });
          }else{
            res.send({redirectTo: 'Invalid Product Key'});
          }
        }else{
          req.session.auth_email = email;
          var auth_email = req.session.auth_email;
          req.session.school_session_key = school_key2;
          if(admin_email==auth_email){
            res.send({redirect:'/dashboard'});
          }else{
            res.send({redirectTo: 'Invalid Product Key'});
          }
        }
    }
  })
});

module.exports = router;