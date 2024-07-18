const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const User=require("../models/user.model")
require('dotenv').config()
const { asyncHandler } = require("../utils/asyncHandler")


const login=asyncHandler(async(req,res)=>{
    if(!(req.body.email&&req.body.password)){
        return res.status(400).json({message:"all fields are necessary",success:false})
    }
    const {email,password}=req.body;
    const existUser= await User.findOne({email})
    if(!existUser){
        return res.status(400).json({message:"User does not exist. Please register",success:false})
    }
    const checkPassword=bcrypt.compareSync(password,existUser.password)
    if(!checkPassword){
        return res.status(400).json({message:"Wrong Password",success:false})
    }
    const accessToken= jwt.sign({id:existUser._id},process.env.JWT_SECRET_KEY)
    const refreshToken= jwt.sign({id:existUser._id},process.env.JWT_SECRET_KEY)
    const  user= await User.findByIdAndUpdate(existUser._id,{refreshToken}).select("-password")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({user:user,messsage:"user login successfully",success:true,accessToken,refreshToken})


})



const register=asyncHandler(async(req,res)=>{
    if(!(req.body.username&&req.body.email&&req.body.password)){
        return res.status(400).json({message:"all fields are necessary",success:false})
    }
    const {username,email,password}=req.body;
    const existUser= await User.findOne({
        $or:[{email},{username}]
    })
    if(existUser){
        return res.status(400).json({message:"User already exists. Please login",success:false})
    }
    const salt=bcrypt.genSaltSync(10)
    const hashPassword= bcrypt.hashSync(password,salt)
    const createdUser=  new User({username,email,password:hashPassword})
    const newUser= await createdUser.save()
    newUser.password="";
    res.status(200).json({user:newUser,success:true});
})


const logout=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.body.id,{
        $unset:{
            refreshToken:1
        }
    },
    {
        new:true
    }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json({message:"user logout successfully",success:true})


})

module.exports={login,register,logout}