import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // adjust if needed
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Chatroom APIs ---
export const openOrCreateChat = (friendId) =>
  API.post(`/messages/open-or-create/${friendId}`);

export const getMyChats = () => API.get("/messages/my-chats");

export const getMessages = (chatRoomId) =>
  API.get(`/messages/${chatRoomId}/messages`);

export const sendMessage = (chatRoomId, text) =>
  API.post(`/messages/${chatRoomId}/send`, { messageText: text });

export default API;
