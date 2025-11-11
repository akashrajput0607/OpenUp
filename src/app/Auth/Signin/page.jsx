import React from 'react'

function Signin() {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <div className="border rounded-2xl  grid gap-4 h-64 w-1xl p-10 justify-center bg-blue-100">
        <input type="text" placeholder="Enter your Username" className="h-10 w-3xs"/>
        <input type="password" placeholder="Enter your Password" className="h-10 w-3xs"/>
        <button className="border rounded-lg bg-blue-400">Login</button>
      </div>
    </div>
  )
}

export default Signin