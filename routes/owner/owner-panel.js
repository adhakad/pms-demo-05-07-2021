var express = require('express');
var router = express.Router();
var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');

var ownerModule=require('../../modules/owner');

router.get('/', function(req, res, next) {
  res.render('./owner/owner-login', { title: 'Password Management System'});
});

router.post('/post',function(req, res, next) {
  var email=req.body.email;
  var key=req.body.key;
  var password=req.body.password;
  var checkEmail=ownerModule.findOne({email:email});
  checkEmail.exec((err, data)=>{
    if(err) throw err;
    if(data){
      var getPassword=data.password;
      if(bcrypt.compareSync(password,getPassword)){
        res.send({redirect:'/owner-dashboard'});
      }else{
        res.send({redirectTo: 'Invalid Password.'});
      }
    }
  });
});
router.get('/owner-register', function(req, res, next) {
  res.render('./owner/owner-register', { title: 'Owner Register', msg:'' });
});
function checkOwner(req,res,next){
  var check_owner = req.body.check_owner;
  var check=ownerModule.findOne({check_owner:check_owner});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('./owner/owner-register', { title: 'Owner Register', msg:'invailid Register !' });
    }
   next();
  });
}
router.post('/owner-register-post',checkOwner,function(req, res, next) {
  var check_owner = req.body.check_owner;
  var email=req.body.email;
  var password=req.body.password;
  var key=req.body.key;
  password =bcrypt.hashSync(req.body.password,10);
  var owner=new ownerModule({
    email:email,
    password:password,
    check_owner:check_owner,
    key:key 
  });
  owner.save((err,doc)=>{
    if(err) throw err;
    res.render('./owner/owner-register', { title: 'Owner Register', msg:'Owner Register Successfully' });
  });
});

module.exports = router;
