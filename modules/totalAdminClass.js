const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var totalAdminClassSchema =new mongoose.Schema({
    
    class_name: {type:Number, 
        },        
});

var totalAdminClassModel = mongoose.model('totalAdminClass', totalAdminClassSchema);
module.exports=totalAdminClassModel;

//mongodb+srv://pms-demo:@Aa1Bb2Hh3@@cluster0.ngu0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 