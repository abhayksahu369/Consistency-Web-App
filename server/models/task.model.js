const mongoose=require("mongoose")
 const {getIndianTime}=require("../utils/getIndianTime")

const logSchema=new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tasks",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    date:{
        type:Date,
        required:true,
        default: () => getIndianTime(Date.now())
    },
    hours:{
        type:Number,
        required:true,
        default:0
    },
    isDone:{
        type:Boolean,
        default:false,
        required:true
    }
})

const taskSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    maxStreak:{
        start:{
            type:Date,
            default:()=>getIndianTime(Date.now()),
            required:true
        },
        end:{
            type:Date,
            default:()=>getIndianTime(Date.now()),
            required:true
        },
        days:{
            type:Number,
            default:0,
            required:true
        }
    },
    currentStreak:{
        start:{
            type:Date,
            default:()=>getIndianTime(Date.now()),
            required:true
        },
        end:{
            type:Date,
            default:()=>getIndianTime(Date.now()),
            required:true
        },
        days:{
            type:Number,
            default:0,
            required:true
        }
    },
    type:{
        type:String,
        enum:["good","bad"],
        default:"good",
        required:true
    },
    createdAt:{
        type:Date,
        require:true,
        default: () => getIndianTime(Date.now())
    }
   

})
const Task=mongoose.model("tasks",taskSchema)
const Log=mongoose.model("logs",logSchema)

module.exports={Task,Log}