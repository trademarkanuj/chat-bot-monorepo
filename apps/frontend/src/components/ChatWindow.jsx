// frontend/src/components/ChatWindow.jsx
import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../api";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await fetchMessages();
    setMessages(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSend = async (text) => {
    setLoading(true);
    try {
      const res = await sendMessage(text);
      console.log('res', res)
      // setMessages((prev) => [...prev, user, bot]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Let's Start Talk</h1>
      <div className="border rounded p-3 h-[60vh] overflow-auto bg-white">
        <MessageList messages={messages} />
      </div>
      <MessageInput onSend={handleSend} loading={loading} />
    </div>
  );
}
