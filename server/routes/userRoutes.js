import express from "express";
import {
  createUser,
  getClaimHistory,
  getUsersWithRanks,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/ranks", getUsersWithRanks);
userRouter.post("/create", createUser);
userRouter.get("/history", getClaimHistory);

export default userRouter;
