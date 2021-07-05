const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var studentUserSchema =new mongoose.Schema({
    school_key:
    {
        type:String,
    },
    student_name:{type:String,
    },
    email: {
        type:String, 
        },
    class_name: {
        type:Number, 
        },
    student_id:
    {
        type:Number,
    },
    roomH_id: 
    {
        type:String, 
    },
    pin:
    {
        type:Number,
        default:121212,
    },
    password: {
        type:String,
    },
    status:{type:String,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var studentUserModel = mongoose.model('studentUser', studentUserSchema);
module.exports=studentUserModel;
//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://myUserAdmin:@Aa1Bb2Hh3@@127.0.0.1:27017/web?authSource=admin
