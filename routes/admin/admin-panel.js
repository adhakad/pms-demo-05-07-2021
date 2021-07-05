var express = require('express');
var router = express.Router();
var adminUserModule=require('../../modules/adminUser');


router.get('/', function(req, res, next) {
  var email=req.session.auth_email;
  var checkUser=adminUserModule.findOne({email:email});
  checkUser.exec((err, data)=>{
    res.render('admin/admin-panel', { title: 'Password Management System',data:data});
  });
});


function checkPin(req,res,next){
  var email=req.session.auth_email;
  var checkPin=adminUserModule.findOne({email:email});
  checkPin.exec((err,data)=>{
    if(err) throw err;
    var pin = data.pin;
    if(pin==121212){
      return res.send({redirectTo: 'Invalid Pin.'});
    }
   next();
  });
}
router.post('/post',checkPin,function(req, res, next) {
  var email=req.session.auth_email;
  var pin = req.body.pin;
  var checkUser=adminUserModule.findOne({email:email});
  checkUser.exec((err, data)=>{
    if(err) throw err;
    var pins = data.pin;
    if(pin==pins){
      res.send({redirect:'./admin-dashboard'});
    }else{
      res.send({redirectTo: 'Invalid Pinn.'});
    }
  });
});

router.put('/set-pin',function(req, res, next) {
  var email = req.session.auth_email;
  var pin=req.body.pin;
  var check=adminUserModule.findOne({email:email});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      var obj_id = data._id;
      var adminUserUpdate=adminUserModule.findByIdAndUpdate(obj_id,{pin:pin});
      adminUserUpdate.exec((err,data)=>{
          if(err) throw err;
          res.send({redirect:'/admin-panel'});
        });
    }
  })
});

module.exports = router;
