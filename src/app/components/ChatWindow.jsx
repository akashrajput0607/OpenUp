"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ChatWindow({
  user,
  messages,
  input,
  setInput,
  sendMessage,
}) {
  return (
    <Card className="w-full flex-1 rounded-none shadow-none border-l">
      <CardContent className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-medium mb-4 text-gray-800">
          Chat with {user?.username}
        </h2>

        <ScrollArea className="flex-1 p-2 border rounded-lg bg-gray-50 mb-3">
          <div className="space-y-2">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2.5 rounded-lg max-w-[75%] text-sm transition-all ${
                  msg.sender === "user"
                    ? "ml-auto bg-gray-900 text-white"
                    : "mr-auto bg-white border text-gray-800"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={sendMessage} className="bg-gray-900 text-white">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
