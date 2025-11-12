// frontend/src/components/MessageList.jsx
export default function MessageList({ messages }) {
  return (
    <div className="space-y-2 chat_list">
      {messages.map((m) => (
        <div
          key={m.id || `${m.role}-${m.created_at}-${Math.random()}`}
          className={`p-2 rounded chat_list_data ${
            m.role === "user" ? "user_text" : "assistant"
          }`}
        >
          {/* <b>{m.role === "user" ? "You" : "Bot"}:</b> */}
           {m.reply}
          {/* <b>{m.role ? "You" : "Bot"}:</b> {m.reply} */}
        </div>
      ))}
    </div>
  );
}
