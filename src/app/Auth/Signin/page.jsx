"use client"
import { signin } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(formData);
      if (res.status === 200) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/Home");
      }
    } catch (error) {
      console.error(error);
      alert("Signin failed!");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <div className="border rounded-2xl  grid gap-4 h-64 w-1xl p-10 justify-center bg-blue-100">
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            className="h-10 w-3xs"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="h-10 w-3xs onChange={handleChange}"
            onChange={handleChange}
            name="password"
          />
          <button
            type="submit"
            className="border rounded-lg bg-blue-400"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
