const mongoose=require('mongoose')

module.exports.connectToMongo =async()=>{
    try{
        mongoose.set("strictQuery",false);
        mongoose.connect(process.env.DB_CONNECTION);
        console.log("Connected to MongoDB Successfully");      
    }catch(error){
        console.log(error);
    }
};

