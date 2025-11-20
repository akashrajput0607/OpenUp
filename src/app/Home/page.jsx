"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { createChatAPI, getChatMessages, getUsers, sendChatMessage } from "../services/chat";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]); // array of users from backend
  const [selectedFriend, setSelectedFriend] = useState(null); // object { _id, username, chatId }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load logged-in user and friends on mount
  useEffect(() => {
    // load user from localStorage
    const rawUser = typeof window !== "undefined" && localStorage.getItem("user");
    if (!rawUser) {
      router.push("/Auth/signin");
      return;
    }
    const parsed = JSON.parse(rawUser);
    setUser(parsed);

    // load friends using helper
    (async () => {
      try {
        const res = await getUsers();
        if (res?.success) setFriends(res.data || []);
        else setFriends([]);
      } catch (err) {
        console.warn("Could not fetch users — using fallback list:", err);
        setFriends([
          { _id: "101", username: "John" },
          { _id: "102", username: "Sarah" },
          { _id: "103", username: "Michael" },
        ]);
      }
    })();
  }, [router]);

  // create or get chat when selecting friend (uses helper)
  const handleFriendSelect = async (friend) => {
    if (!user) return;

    try {
      const res = await createChatAPI(user._id, friend._id);
      if (!res?.success) throw new Error("Chat API failed");

      const chat = res.data;
      const friendWithChat = { ...friend, chatId: chat._id };

      setSelectedFriend(friendWithChat);

      // load messages for this chat using helper
      await loadMessages(chat._id);
    } catch (err) {
      console.error("Error creating/returning chat:", err);
    }
  };

  // load messages for a chat (uses helper)
  const loadMessages = async (chatId) => {
    try {
      const res = await getChatMessages(chatId);
      if (res?.success) {
        setMessages(res.data || []);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      setMessages([]);
    }
  };

  // send message (uses helper)
  const sendMessage = async () => {
    if (!input.trim() || !selectedFriend?.chatId) return;

    try {
      const res = await sendChatMessage(selectedFriend.chatId, input);
      if (!res?.success) throw new Error("Send message failed");

      const newMsg = res.data;
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (err) {
      console.error("Message send error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/Auth/Signin");
  };

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center bg-neutral-900 text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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

      {/* Main area: sidebar + chat */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar friends={friends} onSelectFriend={handleFriendSelect} selectedFriend={selectedFriend} />

        <div className="flex-1">
          <ChatWindow
            user={selectedFriend || { username: "Select a friend" }}
            messages={messages}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            myId={user._id}
          />
        </div>
      </div>
    </div>
  );
}
