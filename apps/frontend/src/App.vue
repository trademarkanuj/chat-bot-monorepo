<script setup>
import { ref, onMounted } from "vue";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const messages = ref([]);
const inputMessage = ref("");
const loading = ref(false);
const error = ref("");

async function loadHistory() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat/`);
    if (!res.ok) throw new Error("Failed to load history");
    messages.value = await res.json();
  } catch (e) {
    console.error(e);
    error.value = "Could not load chat history.";
  }
}

async function sendMessage() {
  error.value = "";
  const text = inputMessage.value.trim();
  if (!text) return;

  loading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Request failed");
    }
    const data = await res.json();
    messages.value.push(data);
    inputMessage.value = "";
  } catch (e) {
    console.error(e);
    error.value = e.message || "Something went wrong while sending message.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadHistory();
});
</script>

<template>
  <div class="app">
    <h1>Gemini Chatbot</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="chat-box">
      <div v-for="msg in messages" :key="msg.id" class="chat-item">
        <div class="user-msg">
          <strong>You:</strong> {{ msg.user_message }}
        </div>
        <div class="bot-msg">
          <strong>Bot:</strong> {{ msg.bot_response }}
        </div>
      </div>
      <div v-if="loading" class="loading">Thinking...</div>
    </div>

    <form class="input-row" @submit.prevent="sendMessage">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="Type your message..."
      />
      <button type="submit" :disabled="loading">Send</button>
    </form>
  </div>
</template>

<style scoped>
.app {
  max-width: 700px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-family: system-ui, sans-serif;
}
.chat-box {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 12px;
}
.chat-item {
  margin-bottom: 10px;
}
.user-msg {
  text-align: right;
}
.bot-msg {
  text-align: left;
  margin-top: 2px;
}
.input-row {
  display: flex;
  gap: 8px;
}
.input-row input {
  flex: 1;
  padding: 8px;
}
.input-row button {
  padding: 8px 16px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 8px;
}
.loading {
  font-style: italic;
}
</style>
