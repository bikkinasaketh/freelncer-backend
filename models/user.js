const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true  
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Client'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{

timestamps:true
}
);

const User=mongoose.model('User',userSchema);
module.exports=User