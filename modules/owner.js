const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var ownerSchema =new mongoose.Schema({
    email:
    {
        type:String,
    },
    key:
    {
        type:String,
    },
    password: 
    {
        type:String, 
    },
    check_owner:
    {
        type:Number,
        default:1234554321,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var ownerModel = mongoose.model('owner',ownerSchema);
module.exports=ownerModel;