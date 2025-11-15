"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([
    { id: 101, username: "John" },
    { id: 102, username: "Sarah" },
    { id: 103, username: "Michael" },
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you?" },
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/Auth/signin");
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/Auth/Signin");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center bg-neutral-900 text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center bg-neutral-900 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={`http://localhost:8000${user.profilePic}`}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <h2 className="text-lg font-semibold">{user.username}</h2>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all cursor-pointer"
        >
          Logout
        </button>
      </header>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar friends={friends} onSelectFriend={setSelectedFriend} />

        {/* Chat Window */}
        <div className="flex-1">
          <ChatWindow
            user={selectedFriend || { username: "Select a friend" }}
            messages={messages}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
