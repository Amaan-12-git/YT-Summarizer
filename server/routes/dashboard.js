import express from "express";
import Chat from "../models/chatSchema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    let chat = await Chat.findOne({ email });
    if (!chat) {
      chat = new Chat({ email, messages: [] });
    }

    chat.messages.push({ role: "user", content: text });
    await chat.save();

    const aiReply = "This is a mock AI response";

    chat.messages.push({ role: "server", content: aiReply });
    await chat.save();

    return res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("Error processing chat:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/chats", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const chat = await Chat.findOne({ email });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    let msg = chat.messages;
    msg.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const formattedMessages = msg.map((message) => ({
      role: message.role,
      text: message.content,
    }));
    return res.status(200).json({ chats: formattedMessages });
  } catch (err) {
    console.error("Error fetching chats:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/chats", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    await Chat.deleteOne({ email });
    return res.status(200).json({ message: "Chat history deleted" });
  } catch (err) {
    console.error("Error deleting chat history:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
