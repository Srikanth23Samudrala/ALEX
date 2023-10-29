const mongoose=require('mongoose')
//This model is for clients data
const userNotifications=new mongoose.Schema({
    notificationId:{
        type:String,
        required:true
    },
    channel:{
        type:String,
        required:true,
        enum: ['all','specific']
    },
    userId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:false
    },
    mode:{
        type:String,
        required:true,
        enum: ['email','ingame'],
        default:'ingame'
    }
})

module.exports=mongoose.model('Notifications',userNotifications)