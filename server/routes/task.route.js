const route=require("express").Router();
const { default: mongoose } = require("mongoose");
const {Task, Log}=require("../models/task.model")
const {asyncHandler}=require("../utils/asyncHandler");
const { getIndianTime } = require("../utils/getIndianTime");

route.post("/create-task",asyncHandler(async(req,res)=>{
    const {name,description,userId,type}=req.body
    if(!(name&&description&&userId)){
        return res.status(400).json({message:"all fields are required",success:false})
    }
    const createdTask=new Task({name,description,userId,type});
    const task=await createdTask.save()
    res.status(200).json({task,success:true})
}))

route.get("/get-all-tasks",asyncHandler(async(req,res)=>{
    const {userId}=req.body
    if(!userId){
        return res.status(400).json({message:"userId is required",success:false})
    }
    const habits= await Task.find({userId})
    return res.status(200).json({habits,success:true})
}))

route.get("/get-task/:taskId",asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    const habit=await Task.aggregate(
        [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(taskId)
              }
            },
            {
              $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "taskId",
                as: "todayLog",
                pipeline: [
                  {
                    $match: {
                      date: getIndianTime(Date.now()).toISOString().split("T")[0],
                    }
                  }
                ]
              }
            },
            {
                $addFields:{
                      todayLog:{
                        $first:"$todayLog"
                    }
                }
            },
            {
              $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "taskId",
                as: "allLogs"
              }
            }
          ]
    )
    if(habit===undefined||habit.length===0){
        return res.status(400).json({message:"habit not found",success:false})
    }
    return res.status(200).json({habit:habit[0],success:true})
}))

route.put("/update-task-hours/:id",asyncHandler(async(req,res)=>{
    const taskId=req.params.id
    const {hours,userId,isDone}=req.body
    if(!(hours&&userId&&isDone)){
        return res.status(400).json({message:"all fields are required",success:false})
    }
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

route.get("/get-all-tasks-and-logs",asyncHandler(async(req,res)=>{
    const userId=req.body.userId
    const habitsAndLogs= await Task.aggregate(
        [
            {
              $match: {
                userId: new mongoose.Types.ObjectId(userId)
              }
            },
            {
              $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "taskId",
                as: "logs"
              }
            }
          ]
    )
    if(habitsAndLogs===undefined||habitsAndLogs.length===0){
        return res.status(400).json({message:"no habits for this user",success:false})
    }
    return res.status(200).json({habitsAndLogs,success:true})
}))


route.get("/get-tasks-by-date",asyncHandler(async(req,res)=>{
    const {date,userId}=req.body
    console.log(date+" "+userId)
    const tasks= await Log.aggregate(
        [
            {
              $match: {
                date: date
              }
            },
            {
              $match: {
                userId:new mongoose.Types.ObjectId(userId)
              }
            },
            {
              $lookup: {
                from: "tasks",
                localField: "taskId",
                foreignField: "_id",
                as: "task",
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      description:1,
                      type:1
                      
                    }
                  }
                ]
              }
            },
            {
              $addFields: {
                task: {
                  $first: "$task"
                }
              }
            }
          ]
    )
    if(tasks===undefined||tasks.length===0){
        return res.status(400).json({message:"no tasks in this particular date",success:false})
    }
    return res.status(200).json({tasks,success:true})
}))


module.exports=route