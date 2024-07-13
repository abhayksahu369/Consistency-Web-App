const route=require("express").Router();
const {Task, Log}=require("../models/task.model")
const {asyncHandler}=require("../utils/asyncHandler");
const { getIndianTime } = require("../utils/getIndianTime");

route.post("/createhabit",asyncHandler(async(req,res)=>{
    const {name,description,userId}=req.body
    if(!(name&&description&&userId)){
        return res.status(400).json({message:"all fields are required",success:false})
    }
    const createdTask=new Task({name,description,userId});
    const task=await createdTask.save()
    res.status(200).json({task,success:true})
}))

route.get("/getallhabits",asyncHandler(async(req,res)=>{
    const {userId}=req.body
    if(!userId){
        return res.status(400).json({message:"userId is required",success:false})
    }
    const habits= await Task.find({userId})
    return res.status(200).json({habits,success:true})
}))

route.get("/getahabit/:taskId",asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    const habit= await Task.findById(taskId)
    let logs=await Log.find({taskId})
    let todayLog
    if(!(logs===undefined&&logs.length===0)){
         todayLog= logs.filter(log=>{
            return log.date===getIndianTime(Date.now()).toISOString().split("T")[0]
        })
    }
    return res.status(200).json({todayLog,habit,logs,success:true})
}))

route.put("/updatehabithours/:id",asyncHandler(async(req,res)=>{
    const taskId=req.params.id
    const {hours,userId,isDone}=req.body
    let todayLog=await Log.findOne({taskId,date:getIndianTime(Date.now()).toISOString().split("T")[0]})
    console.log(todayLog)
    if(!todayLog){
        const createdLog=new Log({taskId,userId,hours,isDone})
         todayLog=await createdLog.save()
    }else{
         todayLog.hours=hours
         todayLog.isDone=isDone
         todayLog=await todayLog.save()
    }
    return res.status(200).json({todayLog,success:true})
    


}))


module.exports=route