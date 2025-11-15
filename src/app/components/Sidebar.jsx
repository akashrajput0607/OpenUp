"use client";

export default function Sidebar({ friends, onSelectFriend }) {
  return (
    <div className="w-64 bg-neutral-900 text-white p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>

      {friends.map((friend) => (
        <button
          key={friend.id}
          onClick={() => onSelectFriend(friend)}
          className="w-full text-left p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700"
        >
          {friend.username}
        </button>
      ))}
    </div>
  );
}
