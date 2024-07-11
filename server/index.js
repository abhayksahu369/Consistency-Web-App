const app=require("express")();



app.get("/",(req,res)=>{
    res.send("checking..")
})


app.listen(5000,()=>{
    console.log("server started")
})