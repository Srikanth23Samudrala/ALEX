const mongoose=require('mongoose')
//This model is for clients data
const userRegister=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetCode:{
        type:String,
        required:false
    },
    accountStatus:{
        type:String,
        required:false,
        enum: ['active','inactive'],
        default:'inactive'
    }
})

module.exports=mongoose.model('User',userRegister)