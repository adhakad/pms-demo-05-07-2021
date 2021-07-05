const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var classTeacherSchema =new mongoose.Schema({
    teachername:{type:String,
    },
 
    teacher_uid:{
        type:Number,
    },
    
    class_name: {
        type:Number,
    },       
    
    class_teacher_status:{type:String,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var classTeacherModel = mongoose.model('classTeacher', classTeacherSchema);
module.exports=classTeacherModel;
//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

