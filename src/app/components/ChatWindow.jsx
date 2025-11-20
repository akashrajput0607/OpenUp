"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatWindow({ user, messages = [], input, setInput, sendMessage, myId }) {
  const endRef = useRef(null);

  // auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-full flex-1 rounded-none shadow-none border-l bg-white">
      <CardContent className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-medium mb-4 text-gray-800">
          Chat with {user?.username}
        </h2>

        <ScrollArea className="flex-1 p-2 border rounded-lg bg-gray-50 mb-3">
          <div className="space-y-3">
            {messages.map((msg) => {
              // backend returns msg._id, and msg.sender may be an object
              const key = msg._id || msg.id || `${msg.sender?._id || "s"}-${Math.random()}`;
              const senderId = msg.sender?._id || msg.sender;
              const isMe = myId && senderId && senderId.toString() === myId.toString();

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2.5 rounded-lg max-w-[75%] text-sm transition-all ${
                    isMe ? "ml-auto bg-gray-900 text-white" : "mr-auto bg-white border text-gray-800"
                  }`}
                >
                  {msg.text}
                </motion.div>
              );
            })}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-lg"
          />
          <Button onClick={sendMessage} className="bg-gray-900 text-white">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
