import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import signupRoutes from "./routes/signup.js";
import logoutRoutes from "./routes/logout.js";
import loginRoutes from "./routes/login.js";
import authRouter from "./routes/authRouter.js";
import dashboard from "./routes/dashboard.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/signup", signupRoutes);
app.use("/logout", logoutRoutes);
app.use("/login", loginRoutes);
app.use("/auth", authRouter);
app.use("/dashboard", dashboard);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    const email = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
