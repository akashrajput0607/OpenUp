"use client"
import { signup } from "@/app/services/Auth";
import { useState } from "react";

function Signup(){
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value,})
  }

  const handleSubmit=async(e)=>{
    try {
      const res=await signup(formData)
      console.log("Response data",res.data)
      alert(res.data.message)
    } catch (error) {
      alert("Signup failed!")
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <div className="border rounded-2xl  grid gap-4 min-h-96 w-1xl p-10 justify-center bg-blue-100">
        <h1 className="text-2xl">Register Yourself</h1>
        <input type="text" name="username" value={formData.username} placeholder="Enter your Username" className="h-10 w-3xs" onChange={handleChange}/>
        <input type="email" name="email" value={formData.email} placeholder="Enter your Email" className="h-10 w-3xs" onChange={handleChange}/>
        <input type="password" name="password" value={formData.password} placeholder="Enter your Password" className="h-10 w-3xs" onChange={handleChange}/>
        <button type="submit" className="border rounded-lg bg-blue-400" onClick={handleSubmit}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
