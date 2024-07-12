const mongoose=require("mongoose")

const user=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        unique:true,
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }

},{
    timestamps:true
})

module.exports=mongoose.model("users",user);