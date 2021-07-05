var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var server = require('http').Server(app);
const { v4: uuidV4 } = require("uuid");
var io = require('socket.io')(server)
var { ExpressPeerServer } = require('peer');
var peerServer = ExpressPeerServer(server, {
  debug: true
});
app.use('/peerjs', peerServer);

var ownerRouter = require('./routes/owner/owner-dashboard');
var ownerPanelRouter = require('./routes/owner/owner-panel');
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var teacherRouter = require('./routes/admin/teacher/teacher');
var adminPanelRouter = require('./routes/admin/admin-panel');
var adminClassTeacherRouter = require('./routes/admin/classTeacher/classTeacher');
var totalAdminClassRouter = require('./routes/admin/totalAdminClass/totalAdminClass'); 
var adminAuthRouter = require('./routes/admin/admin-auth/admin-auth');
var adminDashboardRouter = require('./routes/admin/admin-dashboard');
var adminStudentListRouter = require('./routes/admin/student/studentList');
var studentUserRouter = require('./routes/admin/student/studentUser');
var teacherAdminPanelRouter = require('./routes/adminTeacher/teacher-admin-panel');
var teacherAdminDashboardRouter = require('./routes/adminTeacher/teacher-admin-dashboard');
var getStudentUserRouter = require('./routes/studentUser/getStudentUser');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret:'~K]d9@5LEpD}t267',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000000}
}));

var classModule=require('./modules/class');
var studentUserModule=require('./modules/studentUser');
var teacherModule=require('./modules/teacher');

var student_id;
app.get('/room/:id/:student_id', (req, res) => {
  var abcd = req.params.id;
  student_id = req.params.student_id;
  res.redirect('/'+abcd);
  app.get('/:id',function(req, res, next) {
    var classM=classModule.findOne({room_id:abcd});
    classM.exec((err,data)=>{
      if(err) throw err;
      var teacher_id =  data.teacher_id;
      if(student_id==teacher_id)
      {
        res.render('room', {roomId: req.params.id,roomH_id:""});
      }else{
        var roomH_id = data.teacher_id;
        res.render('room', {roomId: req.params.id,roomH_id:roomH_id});
      }
    }); 
  });
});

app.get('/get',function(req, res, next) {
  var t_id = student_id;
  var studentUser=studentUserModule.findOne({student_id:student_id});
  studentUser.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      if(data==null){
        var teacher=teacherModule.findOne({teacher_uid:t_id});
        teacher.exec((err,datas)=>{
        var teacher_id = datas.teacher_uid;
        var teachername = datas.teachername;
        console.log(teachername);console.log(teacher_id);
        res.send({msg:'success',student_id:teacher_id,student_name:teachername});
        });
      }else{
        var student_id = data.student_id;
        var student_name = data.student_name;
        console.log(student_name);console.log(student_id);
        res.send({msg:'success',student_id:student_id,student_name:student_name});
      }
    }
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, { id, name = uuidV4() }) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", { id, name });
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", { id, name });
    });
  });
});

app.use('/owner-dashboard', ownerRouter);
app.use('/owner-panel', ownerPanelRouter);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/teacher', teacherRouter);
app.use('/admin-panel', adminPanelRouter);
app.use('/classTeacher', adminClassTeacherRouter);
app.use('/totalAdminClass', totalAdminClassRouter);
app.use('/admin-auth',adminAuthRouter);
app.use('/studentList', adminStudentListRouter);
app.use('/studentUser', studentUserRouter);
app.use('/admin-dashboard', adminDashboardRouter);
app.use('/teacher-admin-panel', teacherAdminPanelRouter);
app.use('/teacher-admin-dashboard', teacherAdminDashboardRouter);
app.use('/getStudentUser', getStudentUserRouter);


server.listen(process.env.PORT||3000)