const contacts = [
  { name: "Emma Thompson", initials: "EM", status: "Online" },
  { name: "Michael Johnson", initials: "MJ", status: "Online" },
  { name: "Sophia Lee", initials: "SL", status: "Away" },
  { name: "Robert Brown", initials: "RB", status: "Offline" },
  { name: "Amelia Wilson", initials: "AW", status: "Online" },
];

const replies = {
  "Emma Thompson": [
    "Sure, I’ll check on that.",
    "Got it! Thanks.",
    "Let me know if you need anything else.",
  ],
  "Michael Johnson": [
    "Still deciding about coffee.",
    "Haha, maybe tomorrow.",
    "Yep, I’ll join in 10 mins.",
  ],
  "Sophia Lee": [
    "Design looks great!",
    "We might need changes though.",
    "Okay, sending now.",
  ],
  "Robert Brown": [
    "Looking into it.",
    "I’ll email the budget sheet.",
    "Can you resend that file?",
  ],
  "Amelia Wilson": [
    "Appreciate the help!",
    "You’re the best!",
    "Will ping you later.",
  ],
};

let currentContact = null;

function renderContacts() {
  const list = document.getElementById("contact-list");
  list.innerHTML = "";
  contacts.forEach(contact => {
    list.innerHTML += `
      <div class="contact" onclick="openChat('${contact.name}')">
        <div class="avatar">${contact.initials}</div>
        <div class="details">
          <div class="name">${contact.name}</div>
          <div class="message-preview">${replies[contact.name][0]}</div>
        </div>
        <div class="time">${getTime()}</div>
      </div>
    `;
  });
}

function openChat(name) {
  currentContact = name;
  document.getElementById("chat-name").textContent = name;
  document.getElementById("chat-status").textContent = getStatus(name);
  document.getElementById("chat-avatar").textContent = getInitials(name);
  document.getElementById("chat-messages").innerHTML = "";
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (!msg || !currentContact) return;

  const chatBox = document.getElementById("chat-messages");

  // User message
  chatBox.innerHTML += `
    <div class="message sent">
      ${msg}
      <div class="meta">${getTime()} · Sent</div>
    </div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  showTyping();

  setTimeout(() => {
    hideTyping();
    const response = getRandomReply(currentContact);
    chatBox.innerHTML += `
      <div class="message received">
        ${response}
        <div class="meta">${getTime()} · Delivered</div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1200);
}

function getInitials(name) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
}

function getStatus(name) {
  const contact = contacts.find(c => c.name === name);
  return contact ? contact.status : "";
}

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getRandomReply(contactName) {
  const list = replies[contactName] || ["Okay!"];
  return list[Math.floor(Math.random() * list.length)];
}

function showTyping() {
  document.getElementById("typing-indicator").style.display = "flex";
}

function hideTyping() {
  document.getElementById("typing-indicator").style.display = "none";
}

renderContacts();

document.getElementById("messageInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
