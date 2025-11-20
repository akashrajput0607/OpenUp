"use client";

import React from "react";

export default function Sidebar({ friends = [], onSelectFriend, selectedFriend }) {
  return (
    <aside className="w-64 bg-neutral-900 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>

      {friends.length === 0 && (
        <p className="text-sm text-gray-400">No friends found.</p>
      )}

      <div className="space-y-2">
        {friends.map((friend) => {
          const active = selectedFriend && selectedFriend._id === friend._id;
          return (
            <button
              key={friend._id || friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`w-full text-left p-3 rounded-lg transition ${
                active ? "bg-neutral-700" : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* optional: friend.profilePic */}
                <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-sm">
                  {friend.username?.[0] || "U"}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{friend.username}</div>
                  {/* optionally show last message / status */}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
