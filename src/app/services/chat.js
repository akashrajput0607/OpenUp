import { API } from "../Utils/Axiosinstance";

// 1) Get all users (Friends List)
export async function getUser() {
  try {
    const res = await API.get("msg/users");
    return {
      success: true,
      data: res.data.users,
    };
  } catch (error) {
    console.error("Get users error:", error);
    throw error;
  }
}

// 2) Create OR get chat between two users
export async function createChatAPI(userId1, userId2) {
  console.log("CreatechatAPI is running")
  try {
    const res = await API.post("msg/create", {
      userIds: [userId1, userId2],
    });

    return {
      success: true,
      data: res.data.chat, // chat object with _id
    };
  } catch (error) {
    console.error("Chat create/get error:", error);
    throw error;
  }
}

// 3) Get messages of selected chat
export async function getChatMessages(chatId) {
  try {
    const res = await API.get(`msg/getmessage/${chatId}`);

    return {
      success: true,
      data: res.data.messages, // Array of messages
    };
  } catch (error) {
    console.error("Get messages error:", error);
    throw error;
  }
}

// 4) Send a message inside a chat
export async function sendChatMessage(chatId, text) {
  try {
    const res = await API.post("/msg/send", {
      chatId,
      text,
    });

    return {
      success: true,
      data: res.data.message, // single message object
    };
  } catch (error) {
    console.error("Send message error:", error);
    throw error;
  }
}
