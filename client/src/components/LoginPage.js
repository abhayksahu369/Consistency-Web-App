"use client"

import axios from "axios"
import { useState } from "react"

const LoginPage=()=>{
    const [user,setUser]=useState({email:"",password:""})
    const handleLogin=async()=>{
        console.log(user)
        const result=await axios.post("http://localhost:5000/auth/login",user,{
            withCredentials:true
        });
        console.log(result.data)
    }
    return(
        <div>
          <input type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}></input>
          <input type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}></input>
          <button onClick={handleLogin}>login</button>
        </div>
    )
}


export default LoginPage