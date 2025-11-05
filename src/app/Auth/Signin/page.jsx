import React from 'react'

function Signin() {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <div className="border-1 rounded-2xl  grid gap-4 h-80 w-1xl p-10 justify-center bg-blue-100">
        <h1 className="text-2xl">Login</h1>
        <input type="text" placeholder="Enter your Username" className="h-15 w-3xs"/>
        <input type="password" placeholder="Enter your Password" className="h-15 w-3xs"/>
      </div>
    </div>
  )
}

export default Signin