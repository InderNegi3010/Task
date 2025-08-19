import express from "express";
import { claimPoints } from "../controllers/claimController.js";

const claimRouter = express.Router();

claimRouter.post("/claim", claimPoints);

export default claimRouter;
