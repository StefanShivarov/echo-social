import { html, render } from "https://esm.run/lit-html@1";

const socket = io();

const loadMessages = async (chatId) => {
  const response = await fetch(`/direct/${chatId}/messages`);
  if (!response.ok) {
    console.error("Failed to fetch messages!");
    return [];
  }
  return await response.json();
};

const senderId = document.getElementById("senderId").value;

const messageTemplate = (messages) => html`
  <ul>
    ${messages.map(
      (msg) =>
        html`
          <li class="${msg.senderId === currentUserId ? "message-sent" : "message-received"}">
            ${msg.content}
          </li>
        `
    )}
  </ul>
`;

const initChat = async () => {
  const chatId = document.getElementById("chatId").value;
  const messages = await loadMessages(chatId);
  const messagesSection = document.getElementById("messages");
  render(messageTemplate(messages), messagesSection);

  socket.on("receiveMessage", (message) => {
    messages.push(message);
    render(messageTemplate(messages), messagesSection);
  });

  const sendMessage = () => {
    const messageInput = document.getElementById("messageInput");
    const message = { chatId, senderId, content: messageInput.value };
    socket.emit("sendMessage", message);
    messageInput.value = "";
    render(messageTemplate(messages), messagesSection);
  };

  document.getElementById("sendButton").addEventListener("click", sendMessage);

  socket.emit("joinChat", { chatId });
};

window.onload = initChat;
