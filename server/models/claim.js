import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true, min: 1, max: 10 },
  },
  { timestamps: true }
);

const claimModel = mongoose.models.Claim || mongoose.model("Claim", claimSchema);

export default claimModel;
