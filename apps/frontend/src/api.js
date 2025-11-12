// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchMessages = () => api.get("/messages").then((r) => r.data);

export const sendMessage = (content) => {
  try {
    api.post("/chat", { message: content }).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("err", error.response);
  }
};

export default api;
