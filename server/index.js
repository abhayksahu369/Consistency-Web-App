const express=require("express");
const app=express()
const authRoute=require("./routes/auth.route")
const taskRoute=require("./routes/task.route")


const {connectdb}=require("./utils/dbConfig");
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/auth",authRoute)
app.use("/task",taskRoute)


app.listen(5000,()=>{
    console.log("server started")
    connectdb()
})