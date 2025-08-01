const mongoose = require('mongoose');
const chat = require('./data/chat');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log("server connected ✅");

  let allchat = [
    {
      from: "Alice",
      to: "Bob",
      message: "Hey Bob, how are you?"
    },
    {
      from: "John",
      to: "Doe",
      message: "Let's meet at 5 PM"
    },
    {
      from: "David",
      to: "Sarah",
      message: "Happy birthday! 🎉"
    }
  ];

  try {
    const res = await chat.insertMany(allchat);
    console.log("Inserted chats:", res);
  } catch (err) {
    console.log("Insert error:", err);
  }
}

main().catch((err) => {
  console.log("DB Connection Error:", err);
});
