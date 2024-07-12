const express=require("express");
const app=express()
const authRoute=require("./routes/auth")



const {connectdb}=require("./utils/dbConfig");
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/auth",authRoute)


app.listen(5000,()=>{
    console.log("server started")
    connectdb()
})