import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import signupRoutes from "./routes/signup.js";
import logoutRoutes from "./routes/logout.js";
import loginRoutes from "./routes/login.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/signup", signupRoutes);
app.use("/logout", logoutRoutes);
app.use("/login", loginRoutes);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const email = jwt.verify(token, "ncsdjkcbvsdj");
    console.log("Email from token:", email);
    res.json({ loggedIn: true });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
