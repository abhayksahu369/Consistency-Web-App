const { default: mongoose } = require("mongoose");
const { Task, Log } = require("../models/task.model")
const { asyncHandler } = require("../utils/asyncHandler");
const { getIndianTime } = require("../utils/getIndianTime");
const jwt = require("jsonwebtoken")


const createTask = asyncHandler(async (req, res) => {
    const token = req.cookies.accessToken
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = result.id
    const { name, description, type } = req.body
    if (!(name && description && userId)) {
        return res.status(400).json({ message: "all fields are required", success: false })
    }
    const createdTask = new Task({ name, description, userId, type });
    const task = await createdTask.save()
    res.status(200).json({ task, success: true })
})





const getAllTask = asyncHandler(async (req, res) => {
    const token = req.cookies.accessToken
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = result.id
    const tasks = await Task.aggregate(
        [
            {
              $match: {
                userId:new mongoose.Types.ObjectId(userId)
              }
            },
            {
              $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "taskId",
                as: "todayLog",
                pipeline:[
                  {
                    $match:{
                      date:getIndianTime(Date.now()).toISOString().split("T")[0]
                    }
                  }
                ]
              }
            }
          ]
    )
    return res.status(200).json({ tasks, success: true })
})

const getTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params
    const task = await Task.aggregate(
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
                $addFields: {
                    todayLog: {
                        $first: "$todayLog"
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
    if (task === undefined || task.length === 0) {
        return res.status(400).json({ message: "habit not found", success: false })
    }
    return res.status(200).json({ task: task[0], success: true })
})




const updateTaskHours = asyncHandler(async (req, res) => {
    const taskId = req.params.id
    const token = req.cookies.accessToken
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = result.id
    const { hours,  isDone} = req.body
    if (!(hours && isDone)) {
        return res.status(400).json({ message: "all fields are required", success: false })
    }
    let logs = await Log.find({ taskId })
    let task = await Task.findOne({ _id: taskId })
    console.log(task)
    let { days, start, end } = task.currentStreak;
    let maxDays = task.maxStreak.days, maxStart = task.maxStreak.start, maxEnd = task.maxStreak.end;
    let recentDate;
    if (logs === undefined || logs.length === 0) {
        console.log("undefinded")
        recentDate = new Log({ taskId, userId, isDone, hours }) // remove the date
        recentDate = await recentDate.save()
        days++
        start = getIndianTime(Date.now()).toISOString().split("T")[0] 
        end = getIndianTime(Date.now()).toISOString().split("T")[0]

    } else {
        console.log("sort")
        logs.sort((a, b) => new Date(b.date) - new Date(a.date))
        if (logs[0].date === getIndianTime(Date.now()).toISOString().split("T")[0]) { 
            console.log("if sort")
            recentDate = await Log.findByIdAndUpdate(logs[0]._id, { hours, isDone }, { new: true })
        } else {
            console.log("else sort")
            recentDate = new Log({ taskId, userId, isDone, hours })
            recentDate = await recentDate.save()

            let yesterday = 0
            if (new Date(getIndianTime(Date.now()).toISOString().split("T")[0]) - (new Date(end)) === 24 * 60 * 60 * 1000) { //change the date
                days++;
                end = getIndianTime(Date.now()).toISOString().split("T")[0]
                if (days > maxDays) {
                    console.log("else if sort")
                    maxDays = days;
                    maxStart = start,
                        maxEnd = end;
                }
            } else {
                console.log("else else sort")
                days = 1;
                start = getIndianTime(Date.now()).toISOString().split("T")[0]
                end = getIndianTime(Date.now()).toISOString().split("T")[0]
            }
        }


    }
    task.currentStreak = { days, start, end };
    task.maxStreak = { days: maxDays, start: maxStart, end: maxEnd }
    const updatedTask = await task.save();



    // if(!todayLog){
    //     const createdLog=new Log({taskId,userId,hours,isDone})
    //      todayLog=await createdLog.save()
    // }else{
    //      todayLog.hours=hours
    //      todayLog.isDone=isDone
    //      todayLog=await todayLog.save()
    // }
    return res.status(200).json({ recentDate, updatedTask, success: true })
})





const getTasksByDate = asyncHandler(async (req, res) => {
    const { date, userId } = req.body
    const tasks = await Log.aggregate(
        [
            {
                $match: {
                    date: date
                }
            },
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
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
                                description: 1,
                                type: 1

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
    if (tasks === undefined || tasks.length === 0) {
        return res.status(400).json({ message: "no tasks in this particular date", success: false })
    }
    return res.status(200).json({ tasks, success: true })
})




const getAllTasksAndLogs = asyncHandler(async (req, res) => {
    const userId = req.body.userId
    const habitsAndLogs = await Task.aggregate(
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
    if (habitsAndLogs === undefined || habitsAndLogs.length === 0) {
        return res.status(400).json({ message: "no habits for this user", success: false })
    }
    return res.status(200).json({ habitsAndLogs, success: true })
})



const updatedTaskDetails=asyncHandler(async(req,res)=>{
    const {name,description,type}=req.body
    const {taskId}=req.params;
    const updatedTask=await Task.findByIdAndUpdate(taskId,{name,description,type},{new:true}).select("name description type");
    return res.status(200).json({updatedTask,success:true})

})

const deleteTask=asyncHandler(async(req,res)=>{
    const {taskId}=req.params;
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({message:"task deleted",success:true})
})

module.exports = { createTask, getAllTask, getTask, updateTaskHours, getAllTasksAndLogs, getTasksByDate,updatedTaskDetails,deleteTask }