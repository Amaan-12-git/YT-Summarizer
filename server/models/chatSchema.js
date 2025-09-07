import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "server", "error"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: "User",
    required: true,
    unique: true,
  },
  messages: [messageSchema],
});

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
