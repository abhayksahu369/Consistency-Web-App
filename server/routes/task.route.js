const route = require("express").Router();
const {createTask,getAllTask,getAllTasksAndLogs,getTasksByDate,getTask,updateTaskHours}=require("../controllers/task.controller")


route.post("/create-task", createTask)

route.get("/get-all-tasks", getAllTask)

route.get("/get-task/:taskId", getTask)

route.put("/update-task-hours/:id", updateTaskHours)

route.get("/get-all-tasks-and-logs", getAllTasksAndLogs)

route.get("/get-tasks-by-date", getTasksByDate)


module.exports = route