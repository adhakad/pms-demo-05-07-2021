const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var teacherSchema =new mongoose.Schema({
    school_key:
    {
        type:String,
    },
    teachername:
    {
        type:String,
    },
 
    teacher_uid:
    {
        type:Number,
        
    },
    exist_id:
    {
        type:Number,
    },
    
    image:String,
    class_name: 
    {
        type:Number,
    },       
    subject_name: 
    {
        type:String, 
    },

    email: 
    {
        type:String, 
    },
    pin:
    {
        type:Number,
        default:121212,
    },
    password: 
    {
        type:String, 
        required: true
    },
    teacher_status:
    {
        type:String,
    },
    class_teacher_status:
    {
        type:String,
    },
    date:
    {
        type: Date, 
        default: Date.now 
    }
});

var teacherModel = mongoose.model('teacher', teacherSchema);
module.exports=teacherModel;
//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

