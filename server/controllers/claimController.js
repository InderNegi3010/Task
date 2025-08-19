import userModel from "../models/user.js";
import claimModel from "../models/claim.js";

const claimPoints = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId is required" });

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Random points 1–10
  const points = Math.floor(Math.random() * 10) + 1;

  // Save claim
  await claimModel.create({ user: user._id, points });

  // Update user points
  user.totalPoints += points;
  await user.save();

  res.json({ pointsAwarded: points, user });

  // Emit socket event
  const io = req.app.get("io");
  if (io) io.emit("leaderboard:update");
};

export { claimPoints };
