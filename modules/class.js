const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var classSchema =new mongoose.Schema({
    tObj_id:
    {
        type:String,
    },
    teacher_id:
    {
        type:Number, 
    },
    class_name: 
    {
        type:Number,
    },        
    subject_name: 
    {
        type:String, 
    },
    room_id:
    {
        type:Number, 
    },
    roomH_id: 
    {
        type:String, 
    },
    school_key:
    {
        type:String,
    },
    password: 
    {
            type:String,
            required: true
    },
    
});

var classModel = mongoose.model('class', classSchema);
module.exports=classModel;

//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority