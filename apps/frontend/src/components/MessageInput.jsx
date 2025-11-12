// frontend/src/components/MessageInput.jsx
import { useState } from "react";

export default function MessageInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2 msg_input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        disabled={loading}
        className="border rounded px-4 py-2"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
