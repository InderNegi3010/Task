import userModel from "../models/user.js";
import claimModel from "../models/claim.js";

const addRanks = (users) => {
  const sorted = [...users].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  let currentRank = 0;
  let prevPoints = null;
  return sorted.map((u, idx) => {
    if (prevPoints !== u.totalPoints) {
      currentRank = idx + 1;
      prevPoints = u.totalPoints;
    }
    return { ...u.toObject(), rank: currentRank };
  });
};

const getUsersWithRanks = async (req, res) => {
  const users = await userModel.find({}).sort({ createdAt: 1 });
  const ranked = addRanks(users);
  res.json(ranked);
};

const createUser = async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: "Name required" });
  const existing = await userModel.findOne({ name: name.trim() });
  if (existing) return res.status(409).json({ message: "User already exists" });
  const user = await userModel.create({ name: name.trim() });
  res.status(201).json(user);
};

const getClaimHistory = async (req, res) => {
  const { userId, limit = 50 } = req.query;
  const q = userId ? { user: userId } : {};
  const items = await claimModel.find(q)
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(Number(limit));
  res.json(items);
};

export { addRanks, createUser, getClaimHistory , getUsersWithRanks};
