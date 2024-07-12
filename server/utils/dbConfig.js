const { default: mongoose } = require("mongoose")

const connectdb=()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/consistencywebapp")
    console.log("connected to database")
}


module.exports={connectdb}
