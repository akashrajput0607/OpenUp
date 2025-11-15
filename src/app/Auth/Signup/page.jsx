"use client";
import { signup } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Signup() {
  const router=useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setFormData({ ...formData, profilePic: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profilePic) data.append("profilePic", formData.profilePic); // ✅ fixed

    try {
      const res = await signup(data);
      if (res.status === 201) {
        alert("Signup successful!");
        router.push("/Auth/Signin");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <form
        onSubmit={handleSubmit}
        className="border rounded-2xl grid gap-4 p-10 bg-blue-100"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Register Yourself
        </h1>

        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter your Username"
          className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Profile Pic
          </h2>

          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>

          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="profilePic"
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full cursor-pointer shadow-md transition-transform hover:scale-105"
          >
            {preview ? "Change Image" : "Upload Image"}
          </label>
        </div>

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your Password"
          className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="border rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
