import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import claimRouter from "./routes/claimRoutes.js";
import seedIfEmpty from "./utils/seed.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/claims", claimRouter);

app.get("/", (req, res) => {
  res.send("Inder is Here");
});

// Seed initial users
seedIfEmpty();

httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
