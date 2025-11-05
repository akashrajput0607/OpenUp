import React from "react";

function Signup() {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <div className="border-1 rounded-2xl  grid gap-4 min-h-96 w-1xl p-10 justify-center bg-blue-100">
        <h1 className="text-2xl">Register Yourself</h1>
        <input type="text" placeholder="Enter your Username" className="h-10 w-3xs"/>
        <input type="email" placeholder="Enter your Email" className="h-10 w-3xs" />
        <input type="password" placeholder="Enter your Password" className="h-10 w-3xs"/>
        <button className="border-1 rounded-lg bg-blue-400">Signup</button>
      </div>
    </div>
  );
}

export default Signup;
